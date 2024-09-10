import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Nav = styled.nav`
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(Link)`
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  text-decoration: none;
  font-weight: bold;
`

const NavLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.medium};
`

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.medium};
`

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border: none;
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }
`

export default function Navigation() {
  return (
    <Nav>
      <Logo to="/">🚀 CrowdHealth</Logo>
      <NavLinks>
        <NavLink to="/">Explore</NavLink>
        <NavLink to="/create">Create</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/about-us">About</NavLink>
      </NavLinks>
      <ButtonGroup>
        <Button>Connect Wallet</Button>
      </ButtonGroup>
    </Nav>
  )
}