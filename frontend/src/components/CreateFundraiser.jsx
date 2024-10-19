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
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const Title = styled.h1`
  color: #1a1a1a;
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
  color: #4a4a4a;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  color: #1a1a1a;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  color: #1a1a1a;
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
    color: #9ca3af;
  }
`;

const Select = styled.select`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  color: #1a1a1a;
  font-size: 14px;
  width: 100%;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
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
  background-color: #fee2e2;
  border-radius: 6px;
`;

const SuccessMessage = styled.p`
  color: #059669;
  text-align: center;
  font-size: 14px;
  margin-top: 8px;
  padding: 8px;
  background-color: #d1fae5;
  border-radius: 6px;
`;

const WalletMessage = styled.div`
  text-align: center;
  padding: 24px;
  background-color: #f3f4f6;
  border-radius: 12px;
  margin: 24px 0;
  color: #4b5563;
  font-size: 16px;
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        
        try {
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          const contractAddress = '0xfbfEfD8C66FeaeD1F0207FBa7262855799b0e59e'; // Ensure this is the correct address
          const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContract(contractInstance);
        } catch (error) {
          console.error("Contract initialization error:", error);
          setError("Failed to initialize contract. Please check your connection.");
        }
      }
    };

    checkConnection();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
          setWeb3(null);
          setContract(null);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFundraiserDataChange = (e) => {
    const { name, value } = e.target;
    setFundraiserData(prevData => ({ ...prevData, [name]: value }));
  };

  const checkWalletConnection = () => {
    if (!account) {
      setError('Please connect your wallet first using the connect button in the navbar.');
      return false;
    }
    return true;
  };

  const handleUserRegistration = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!checkWalletConnection()) {
      setIsLoading(false);
      return;
    }
  
    try {
      const userType = parseInt(userData.userType);
  
      if (userType === 0) {
        const result = await contract.methods.registerPatient(
          userData.condition,
          userData.hospitalAddress
        ).send({ 
          from: account,
          gas: 300000 
        });
        console.log('Patient registration result:', result);
      } else if (userType === 1) {
        const result = await contract.methods.registerDonor().send({ 
          from: account,
          gas: 300000 
        });
        console.log('Donor registration result:', result);
      } else {
        setError('Invalid user type selected.');
        setIsLoading(false);
        return;
      }
  
      setSuccess('User registered successfully!');
      setUserData({ userType: '', condition: '', hospitalAddress: '' });
    } catch (error) {
      console.error('Registration error:', error);
      setError(`Transaction failed: ${error.message}`);
    }
    setIsLoading(false);
  };

  const handleFundraiserSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!checkWalletConnection()) {
      setIsLoading(false);
      return;
    }

    try {
      const targetAmount = web3.utils.toWei(fundraiserData.targetAmount, 'ether');
      const hospitalAddress = userData.hospitalAddress;

      if (!hospitalAddress || !web3.utils.isAddress(hospitalAddress)) {
        setError('Valid hospital address is required.');
        setIsLoading(false);
        return;
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