import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Web3 from 'web3';
import contractABI from '../contracts/abi/med.json';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.large};
  max-width: 600px;
  margin: 0 auto;
`;

const FormContainer = styled.div`
  padding: ${(props) => props.theme.spacing.large};
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  border-radius: ${(props) => props.theme.borderRadius.medium};
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: ${(props) => props.theme.spacing.large};
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.medium};
`;

const Label = styled.label`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.small};
`;

const Input = styled.input`
  padding: ${(props) => props.theme.spacing.small};
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

const TextArea = styled.textarea`
  padding: ${(props) => props.theme.spacing.small};
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  min-height: 100px;
`;

const Select = styled.select`
  padding: ${(props) => props.theme.spacing.small};
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 1px solid ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

const Button = styled.button`
  padding: ${(props) => props.theme.spacing.small} ${(props) => props.theme.spacing.medium};
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.small};
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const SuccessMessage = styled.p`
  color: green;
  text-align: center;
`;


export default function CreateFundraiser() {
  const [userData, setUserData] = useState({
    userType: '',
    condition: '',
    hospitalAddress: '',
  });

  const [fundraiserData, setFundraiserData] = useState({
    targetAmount: '',
    description: '',
  });

  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          const contractAddress = '0x4ebcaf0bcc1110da7bfbae1cf631644be6edf8d1'; // Ensure this is the correct address
          const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContract(contractInstance);
        } catch (error) {
          console.error("User denied account access or wrong contract address", error);
          setError("Failed to connect to Ethereum. Please check your MetaMask connection.");
        }
      } else {
        setError('Please install MetaMask!');
      }
    };

    initWeb3();
  }, []);

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFundraiserDataChange = (e) => {
    const { name, value } = e.target;
    setFundraiserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleUserRegistration = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!web3 || !contract || !account) {
      setError('Web3 is not initialized. Please check your MetaMask connection.');
      return;
    }

    try {
      const userType = parseInt(userData.userType);

      // For Donors, send a default address; for Patients, validate the hospital address
      const condition = userType === 0 ? userData.condition : '';
      const hospitalAddress = userType === 0 ? userData.hospitalAddress : '0x0000000000000000000000000000000000000000';

      // Ensure hospital address is valid for patients
      if (userType === 0 && !web3.utils.isAddress(userData.hospitalAddress)) {
        setError('Invalid hospital address. Please enter a valid Ethereum address.');
        return;
      }

      const gasEstimate = await contract.methods.registerUser(
        userType,
        condition,
        hospitalAddress
      ).estimateGas({ from: account });

      await contract.methods.registerUser(
        userType,
        condition,
        hospitalAddress
      ).send({ from: account, gas: gasEstimate });

      setSuccess('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error);
      setError(`Failed to register user: ${error.message}`);
    }
  };

  const handleFundraiserSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!web3 || !contract || !account) {
      setError('Web3 is not initialized. Please check your MetaMask connection.');
      return;
    }

    try {
      const targetAmount = web3.utils.toWei(fundraiserData.targetAmount, 'ether');
      const gasEstimate = await contract.methods.createFundraiser(targetAmount, fundraiserData.description)
        .estimateGas({ from: account });

      await contract.methods.createFundraiser(targetAmount, fundraiserData.description)
        .send({ from: account, gas: gasEstimate });

      setSuccess('Fundraiser created successfully!');
      setFundraiserData({ targetAmount: '', description: '' });
    } catch (error) {
      console.error('Error creating fundraiser:', error);
      setError(`Failed to create fundraiser: ${error.message}`);
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>User Registration</Title>
        <Form onSubmit={handleUserRegistration}>
          <Label htmlFor="userType">User Type</Label>
          <select
            id="userType"
            name="userType"
            value={userData.userType}
            onChange={handleUserDataChange}
            required
            style={{
              width: '100%',  // Adjust width to make it full width
              padding: '10px',  // Adjust padding to make the input larger
              fontSize: '16px', // Adjust font size for readability
              borderRadius: '5px', // Optional: Rounded corners
              border: '1px solid #ccc' // Optional: Border style
            }}
          >
            <option value="">Select user type</option>
            <option value="0">Patient</option>
            <option value="1">Donor</option>
          </select>



          {/* Show condition and hospital address only if registering as a patient */}
          {userData.userType === '0' && (
            <>
              <Label htmlFor="condition">Medical Condition</Label>
              <Input
                type="text"
                id="condition"
                name="condition"
                value={userData.condition}
                onChange={handleUserDataChange}
                required
              />

              <Label htmlFor="hospitalAddress">Hospital Ethereum Address</Label>
              <Input
                type="text"
                id="hospitalAddress"
                name="hospitalAddress"
                value={userData.hospitalAddress}
                onChange={handleUserDataChange}
                required
              />
            </>
          )}

          <Button type="submit">Register User</Button>
        </Form>
      </FormContainer>

      <FormContainer>
        <Title>Create a Fundraiser</Title>
        <Form onSubmit={handleFundraiserSubmit}>
          <Label htmlFor="targetAmount">Fundraising Goal (ETH)</Label>
          <Input
            type="number"
            id="targetAmount"
            name="targetAmount"
            value={fundraiserData.targetAmount}
            onChange={handleFundraiserDataChange}
            required
            min="0.01"
            step="0.01"
          />

          <Label htmlFor="description">Fundraiser Description</Label>
          <TextArea
            id="description"
            name="description"
            value={fundraiserData.description}
            onChange={handleFundraiserDataChange}
            required
          />

          <Button type="submit">Create Fundraiser</Button>
        </Form>
      </FormContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </PageContainer>
  );
}