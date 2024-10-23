import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Web3 from 'web3';
import { LuLogIn } from "react-icons/lu";
import logo from "../assets/crowdlogo.png";
import backgroundImage from "../assets/Landing.png";
import { WalletConnected } from "../utils/WalletConnected";

import { useWalletInfo, useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
const Nav = styled.nav`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center top;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 74px;
  margin-bottom: 0;
  border-bottom: none;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(58, 23, 105, 0.9), rgba(58, 23, 105, 0.7));
    z-index: 1;
  }
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 2;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  color: #3498db;
`;

const LogoImage = styled.img`
  width: 40px;
  height: auto;
  margin-right: 10px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
`;

export default function Navigation() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  // Use web3Modal's hooks
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletInfo } = useWalletInfo();

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        try {
          const accounts = await web3Instance.eth.getAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error("Error checking accounts:", error);
        }

        window.ethereum.on('accountsChanged', (accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          } else {
            handleLogout();
          }
        });
      } else if (window.web3) {
        const web3Instance = new Web3(window.web3.currentProvider);
        setWeb3(web3Instance);
      } else {
        console.log('Non-Ethereum browser detected. Consider trying MetaMask!');
      }
    };

    initWeb3();

    return () => {
      if (window.ethereum && window.ethereum.removeAllListeners) {
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, []);

  const handleLogout = () => {
    setAccount(null);
    localStorage.removeItem('userWalletAddress');
    navigate('/');
    console.log("Logged out successfully");
  };

  return (
    <Nav>
      <NavContent>
        <Logo to="/">
          <LogoImage src={logo} alt="CrowdHealth Logo" />
          CrowdHealth
        </Logo>
        <NavLinks>
          <NavLink to="/campaigns">Explore</NavLink>
          <NavLink to="/create">Create</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/about-us">About</NavLink>
        </NavLinks>
        <Button onClick={() => open()}>
          {isConnected ? (
            <WalletConnected address={address} icon={walletInfo?.icon} />
          ) : (
            <>
              <span>Connect Wallet</span>
              <LuLogIn className="text-lg hidden md:flex" />
            </>
          )}
        </Button>
      </NavContent>
    </Nav>
  );
}
