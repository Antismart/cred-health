import React from 'react'
import styled from 'styled-components'

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: ${props => props.theme.spacing.large};
  background-color: ${props => props.theme.colors.secondaryBackground};
  border-radius: ${props => props.theme.borderRadius.medium};
  text-align: center;
`

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.large};
`

const Subtitle = styled.p`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.large};
  max-width: 600px;
`

const ConnectButton = styled.button`
  padding: ${props => props.theme.spacing.medium} ${props => props.theme.spacing.large};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`

const Icon = styled.span`
  margin-right: ${props => props.theme.spacing.small};
`

export default function Dashboard() {

  return (
    <DashboardContainer>
      <Title>Welcome to Your Dashboard</Title>
      <Subtitle>
        Connect your wallet to access your fundraisers, track donations, and manage your account.
      </Subtitle>
      <ConnectButton>
        <Icon>🔗</Icon> Connect Wallet
      </ConnectButton>
    </DashboardContainer>
  )
}

