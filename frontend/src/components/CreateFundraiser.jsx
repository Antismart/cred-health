import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Web3 from 'web3';
import contractABI from '../contracts/abi/med.json';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.large};
  background-color: ${props => props.theme.colors.secondaryBackground};
  border-radius: ${props => props.theme.borderRadius.medium};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.large};
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.medium};
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.small};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.borderRadius.small};
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

const TextArea = styled.textarea`
  padding: ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.borderRadius.small};
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  min-height: 100px;
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.borderRadius.small};
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

const Button = styled.button`
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
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
  const [formData, setFormData] = useState({
    title: '',
    goal: '',
    description: '',
    hospitalAddress: '',
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
          const contractAddress = '0x4ebcaf0bcc1110da7bfbae1cf631644be6edf8d1'; // Replace with your contract address
          const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContract(contractInstance);
        } catch (error) {
          console.error("User denied account access or wrong contract address");
        }
      } else {
        setError('Please install MetaMask!');
      }
    };

    initWeb3();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!web3 || !contract || !account) {
      setError('Web3 is not initialized. Please check your MetaMask connection.');
      return;
    }

    try {
      const targetAmount = web3.utils.toWei(formData.goal, 'ether');
      await contract.methods.registerUser(0, formData.description, formData.hospitalAddress).send({ from: account });
      await contract.methods.requestFundraiser(targetAmount).send({ from: account });
      
      setSuccess('Fundraiser created successfully!');
      setFormData({ title: '', goal: '', description: '', hospitalAddress: '' });
    } catch (error) {
      console.error('Error creating fundraiser:', error);
      setError('Failed to create fundraiser. Please check your inputs and try again.');
    }
  };

  return (
    <FormContainer>
      <Title>Create a Fundraiser</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="title">Fundraiser Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <Label htmlFor="goal">Fundraising Goal (ETH)</Label>
        <Input
          type="number"
          id="goal"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          required
          min="0.01"
          step="0.01"
        />

        <Label htmlFor="description">Medical Condition</Label>
        <TextArea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <Label htmlFor="hospitalAddress">Hospital Ethereum Address</Label>
        <Input
          type="text"
          id="hospitalAddress"
          name="hospitalAddress"
          value={formData.hospitalAddress}
          onChange={handleChange}
          required
        />

        <Button type="submit">Create Fundraiser</Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </FormContainer>
  );
}