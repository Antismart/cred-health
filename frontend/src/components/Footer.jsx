import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
      <FooterContainer>
        <FooterContent>
          <FooterSection>
            <FooterTitle>CredHealth</FooterTitle>
            <FooterText>&copy; 2023 CredHealth. All rights reserved.</FooterText>
          </FooterSection>
          <FooterSection>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
          </FooterSection>
        </FooterContent>
      </FooterContainer>
    )
  }
  
  
  const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  padding: 2rem;
`

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`

const FooterTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`

const FooterText = styled.p`
  font-size: 0.9rem;
`

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`


export default Footer