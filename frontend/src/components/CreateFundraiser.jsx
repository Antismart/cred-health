import React, { useState } from 'react'
import styled from 'styled-components'

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
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
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    goal: '',
    description: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    // Reset form or redirect user
  }

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

        <Label htmlFor="category">Category</Label>
        <Select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select a category</option>
          <option value="medical">Medical Expenses</option>
          <option value="community">Community Project</option>
          <option value="education">Education</option>
          <option value="emergency">Emergency Relief</option>
          <option value="other">Other</option>
        </Select>

        <Label htmlFor="goal">Fundraising Goal ($)</Label>
        <Input
          type="number"
          id="goal"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          required
          min="1"
        />

        <Label htmlFor="description">Describe your fundraiser</Label>
        <TextArea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <Button type="submit">Create Fundraiser</Button>
      </Form>
    </FormContainer>
  )
}