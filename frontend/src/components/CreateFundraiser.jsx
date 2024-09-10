import React, { useState } from 'react'
import styled from 'styled-components'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.large};
  max-width: 600px;
  margin: 0 auto;
`

const FormContainer = styled.div`
  padding: ${props => props.theme.spacing.large};
  background-color: ${props => props.theme.colors.secondaryBackground};
  border-radius: ${props => props.theme.borderRadius.medium};
`

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.large};
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.medium};
`

const Label = styled.label`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.small};
`

const Input = styled.input`
  padding: ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.borderRadius.small};
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`

const TextArea = styled.textarea`
  padding: ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.borderRadius.small};
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  min-height: 100px;
`

const Select = styled.select`
  padding: ${props => props.theme.spacing.small};
  border-radius: ${props => props.theme.borderRadius.small};
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`

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
`

export default function CreateFundraiser() {
  const [signUpData, setSignUpData] = useState({
    usrtype: '',
    hospitalWalletAddress: '',
  })

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    goal: '',
    description: '',
  })

  const handleSignUpChange = (e) => {
    const { name, value } = e.target
    setSignUpData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSignUpSubmit = (e) => {
    e.preventDefault()
    console.log('Sign Up Data submitted:', signUpData)
    // Here you would typically send the sign-up data to your backend
  }

  const handleFundraiserSubmit = (e) => {
    e.preventDefault()
    console.log('Fundraiser Form submitted:', formData)
    // Here you would typically send the fundraiser form data to your backend
  }

  return (
    <PageContainer>
      <FormContainer>
        <Title>Sign Up</Title>
        <Form onSubmit={handleSignUpSubmit}>
          <Label htmlFor="usrtype">User Type</Label>
          <Select
            id="usrtype"
            name="usrtype"
            value={signUpData.usrtype}
            onChange={handleSignUpChange}
            required
          >
            <option value="">Select user type</option>
            <option value="0">Patient (0)</option>
            <option value="1">Donor (1)</option>
          </Select>

          <Label htmlFor="hospitalWalletAddress">Hospital Wallet Address</Label>
          <Input
            type="text"
            id="hospitalWalletAddress"
            name="hospitalWalletAddress"
            value={signUpData.hospitalWalletAddress}
            onChange={handleSignUpChange}
            required
          />

          <Button type="submit">Sign Up</Button>
        </Form>
      </FormContainer>

      <FormContainer>
        <Title>Create a Fundraiser</Title>
        <Form onSubmit={handleFundraiserSubmit}>
          <Label htmlFor="title">Fundraiser Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleFormChange}
            required
          />

          <Label htmlFor="goal">Fundraising Goal ($)</Label>
          <Input
            type="number"
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleFormChange}
            required
            min="1"
          />

          <Label htmlFor="description">Describe your fundraiser</Label>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            required
          />

          <Button type="submit">Create Fundraiser</Button>
        </Form>
      </FormContainer>
    </PageContainer>
  )
}