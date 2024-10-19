import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Web3 from 'web3';
import contractABI from '../contracts/abi/med.json';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.large};
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const FormContainer = styled.div`
  padding: 24px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 24px;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  width: 100%;
  min-height: 120px;
  box-sizing: border-box;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  width: 100%;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="white" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
  background-repeat: no-repeat;
  background-position: right 12px top 50%;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  option {
    background-color: rgba(107, 70, 193, 0.7);
    color: white;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease-in-out;
  width: 100%;
  margin-top: 8px;

  &:hover {
    background-color: #1d4ed8;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #dc2626;
  text-align: center;
  font-size: 14px;
  margin-top: 8px;
  padding: 8px;
  background-color: rgba(220, 38, 38, 0.1);
  border-radius: 6px;
`;

const SuccessMessage = styled.p`
  color: #059669;
  text-align: center;
  font-size: 14px;
  margin-top: 8px;
  padding: 8px;
  background-color: rgba(5, 150, 105, 0.1);
  border-radius: 6px;
`;

const WalletMessage = styled.div`
  text-align: center;
  padding: 24px;
  background-color: rgba(243, 244, 246, 0.1);
  border-radius: 12px;
  margin: 24px 0;
  color: white;
  font-size: 16px;
`;

export default function CreateFundraiser() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    userType: '',
    condition: '',
    hospitalAddress: '',
  });

  const [fundraiserData, setFundraiserData] = useState({
    targetAmount: '',
    description: '',
  });

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          const contractAddress = '0xfbfEfD8C66FeaeD1F0207FBa7262855799b0e59e';
          const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContract(contractInstance);
        } catch (error) {
          console.error('Error connecting to wallet:', error);
        }
      } else {
        console.log('Please install MetaMask!');
      }
    };

    initWeb3();
  }, []);

  const handleUserDataChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFundraiserDataChange = (e) => {
    setFundraiserData({ ...fundraiserData, [e.target.name]: e.target.value });
  };

  const handleUserRegistration = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!contract || !account) {
        throw new Error('Contract or account not initialized');
      }

      if (userData.userType === '0') {
        await contract.methods.registerPatient(userData.condition, userData.hospitalAddress).send({ from: account });
      } else if (userData.userType === '1') {
        await contract.methods.registerDonor().send({ from: account });
      }

      setSuccess('User registered successfully!');
      setUserData({ userType: '', condition: '', hospitalAddress: '' });
    } catch (error) {
      console.error('Error registering user:', error);
      setError(`Failed to register user: ${error.message}`);
    }
    setIsLoading(false);
  };

  const handleFundraiserSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!contract || !account) {
        throw new Error('Contract or account not initialized');
      }

      const targetAmount = web3.utils.toWei(fundraiserData.targetAmount, 'ether');
      const hospitalAddress = userData.hospitalAddress;

      if (!web3.utils.isAddress(hospitalAddress)) {
        throw new Error('Invalid hospital address');
      }

      await contract.methods.createFundraiser(
        targetAmount,
        fundraiserData.description,
        hospitalAddress
      ).send({ from: account });

      setSuccess('Fundraiser created successfully!');
      setFundraiserData({ targetAmount: '', description: '' });
    } catch (error) {
      console.error('Error creating fundraiser:', error);
      setError(`Failed to create fundraiser: ${error.message}`);
    }
    setIsLoading(false);
  };

  if (!account) {
    return (
      <PageContainer>
        <WalletMessage>
          <h2>Wallet Connection Required</h2>
          <p>Please connect your wallet using the connect button in the navbar to access this feature.</p>
        </WalletMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <FormContainer>
        <Title>User Registration</Title>
        <Form onSubmit={handleUserRegistration}>
          <Label htmlFor="userType">User Type</Label>
          <Select
            id="userType"
            name="userType"
            value={userData.userType}
            onChange={handleUserDataChange}
            required
            disabled={isLoading}
          >
            <option value="">Select user type</option>
            <option value="0">Patient</option>
            <option value="1">Donor</option>
          </Select>

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
                disabled={isLoading}
                placeholder="Enter your medical condition"
              />

              <Label htmlFor="hospitalAddress">Hospital Ethereum Address</Label>
              <Input
                type="text"
                id="hospitalAddress"
                name="hospitalAddress"
                value={userData.hospitalAddress}
                onChange={handleUserDataChange}
                required
                disabled={isLoading}
                placeholder="Enter hospital's Ethereum address"
              />
            </>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Register User'}
          </Button>
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
            disabled={isLoading}
            placeholder="Enter target amount in ETH"
          />

          <Label htmlFor="description">Fundraiser Description</Label>
          <TextArea
            id="description"
            name="description"
            value={fundraiserData.description}
            onChange={handleFundraiserDataChange}
            required
            disabled={isLoading}
            placeholder="Describe your fundraiser"
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Create Fundraiser'}
          </Button>
        </Form>
      </FormContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </PageContainer>
  );
}