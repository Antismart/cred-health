import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
      <HomePageContainer>
        <HeroSection>
          <HeroTitle>Welcome to CredHealth</HeroTitle>
          <HeroSubtitle>Empowering Healthcare Through Innovative Financing</HeroSubtitle>
          <CTAButton to="/patient-dashboard">Get Started</CTAButton>
        </HeroSection>
      </HomePageContainer>
    )
}

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.primary} 0%, ${({ theme }) => theme.secondary} 100%);
  color: white;
  border-radius: 8px;
`

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto 2rem;
`

const CTAButton = styled(Link)`
  background-color: white;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 50px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`



export default HomePage