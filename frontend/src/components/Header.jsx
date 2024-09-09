import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'

const Header = ({ toggleTheme, isDarkTheme, isAuthenticated, connectWallet }) => {
  return (
    <HeaderContainer>
      <Logo>CredHealth</Logo>
      <Nav>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/patient-dashboard">Patient</StyledLink>
        <StyledLink to="/hospital-dashboard">Hospital</StyledLink>
      </Nav>
      <ThemeToggle onClick={toggleTheme}>
        {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
      </ThemeToggle>
    </HeaderContainer>
  )
}


const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.cardBg};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.background};  }
`

export default Header