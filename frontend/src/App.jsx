import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ethers } from 'ethers';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import PatientDashboard from './components/PatientDashboard';
import HospitalDashboard from './components/HospitalDashboard';
import LoanRequestForm from './components/LoanRequestForm';
import LoanStatus from './components/LoanStatus';
import CreditScoreCheck from './components/CreditScoreCheck';
import HospitalOnboarding from './components/HospitalOnboarding';

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log('Connected wallet address:', address);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      console.error('No Ethereum wallet detected');
    }
  };

  return (
    <Router>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <GlobalStyle />
        <AppContainer>
          <Header
            toggleTheme={toggleTheme}
            isDarkTheme={isDarkTheme}
            isAuthenticated={isAuthenticated}
            connectWallet={connectWallet}
          />
          <MainContent>
            <Sidebar />
            <PageContent>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/patient-dashboard" element={<PatientDashboard />} />
                <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
                <Route path="/loan-request" element={<LoanRequestForm />} />
                <Route path="/loan-status" element={<LoanStatus />} />
                <Route path="/credit-score-check" element={<CreditScoreCheck />} />
                <Route path="/hospital-onboarding" element={<HospitalOnboarding />} />
              </Routes>
            </PageContent>
          </MainContent>
          <Footer />
        </AppContainer>
      </ThemeProvider>
    </Router>
  );
};

const lightTheme = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#f0f2f5',
  text: '#2c3e50',
  cardBg: '#ffffff',
};

const darkTheme = {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#2c3e50',
  text: '#ecf0f1',
  cardBg: '#34495e',
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  display: flex;
  flex: 1;
`;

const PageContent = styled.div`
  flex: 1;
  padding: 2rem;
`;

export default App;
