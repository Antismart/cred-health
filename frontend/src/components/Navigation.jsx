import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Web3 from 'web3';

const Nav = styled.nav`
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  text-decoration: none;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.medium};
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.medium};
`;

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
`;

export default function Navigation() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
        } catch (error) {
          console.error("User denied account access");
        }
      } else if (window.web3) {
        const web3Instance = new Web3(window.web3.currentProvider);
        setWeb3(web3Instance);
      } else {
        console.log('Non-Ethereum browser detected. Consider trying MetaMask!');
      }
    };

    initWeb3();
  }, []);

  const connectWallet = async () => {
    if (web3) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  };

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
        {account ? (
          <Button>{account.slice(0, 6)}...{account.slice(-4)}</Button>
        ) : (
          <Button onClick={connectWallet}>Connect Wallet</Button>
        )}
      </ButtonGroup>
    </Nav>
  );
}