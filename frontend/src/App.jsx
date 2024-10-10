import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Web3 from 'web3';
import Navigation from './components/Navigation';
import AboutUs from './components/AboutUs';
import DashBoard from './components/DashBoard';
import CreateFundraiser from './components/CreateFundraiser';
import ActiveCampaigns from './components/ActiveCampaigns';
import theme from './theme';
import './App.css';
import contractABI from './contracts/abi/med.json';

const AppContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  min-height: 100vh;
  font-family: ${props => props.theme.fonts.main};
`;

const ContentContainer = styled.div`
  padding: ${props => props.theme.spacing.large};
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.large};
`;

const CampaignGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.large};
`;

const CampaignCard = styled.div`
  background-color: ${props => props.theme.colors.secondaryBackground};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.large};
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const CampaignTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.small};
`;

const CampaignDescription = styled.p`
  color: ${props => props.theme.colors.secondaryText};
  margin-bottom: ${props => props.theme.spacing.small};
`;

const ProgressBar = styled.div`
  background-color: ${props => props.theme.colors.progressBackground};
  border-radius: ${props => props.theme.borderRadius.small};
  height: 8px;
  margin-bottom: ${props => props.theme.spacing.small};
  overflow: hidden;
`;

const Progress = styled.div`
  background-color: ${props => props.theme.colors.primary};
  height: 100%;
  width: ${props => props.width};
`;

const CampaignInfo = styled.div`
  color: ${props => props.theme.colors.secondaryText};
  font-size: 0.9em;
`;

const DonateButton = styled.button`
  margin-top: ${props => props.theme.spacing.small};
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }
`;

export default function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
          const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContract(contractInstance);

          // Fetch active fundraisers from the contract
          const fundraiserCount = await contractInstance.methods.fundraiserCounter().call();
          const fetchedCampaigns = [];
          for (let i = 0; i < fundraiserCount; i++) {
            const fundraiser = await contractInstance.methods.getFundraiserDetails(i).call();
            fetchedCampaigns.push({
              title: fundraiser.condition, // Replace with actual title/condition
              description: fundraiser.description,
              targetAmount: web3Instance.utils.fromWei(fundraiser.targetAmount, 'ether'),
              amountRaised: web3Instance.utils.fromWei(fundraiser.amountRaised, 'ether'),
              completed: fundraiser.completed,
            });
          }
          setCampaigns(fetchedCampaigns);
        } catch (error) {
          console.error('Error connecting to contract or fetching campaigns', error);
        }
      } else {
        console.log('Please install MetaMask');
      }
    };

    initWeb3();
  }, []);

  const handleDonate = (campaignName) => {
    alert(`You clicked Donate for ${campaignName}`);
    // Logic for navigating to the donation page or handling the donation
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContainer>
          <Navigation />
          <ContentContainer>
            <Routes>
              <Route path="/" element={
                <>
                  <SectionTitle>Active Campaigns</SectionTitle>
                  <CampaignGrid>
                    {campaigns.map((campaign, index) => (
                      <CampaignCard key={index}>
                        <CampaignTitle>{campaign.title}</CampaignTitle>
                        <CampaignDescription>{campaign.description}</CampaignDescription>
                        <ProgressBar>
                          <Progress width={`${(campaign.amountRaised / campaign.targetAmount) * 100}%`} />
                        </ProgressBar>
                        <CampaignInfo>{((campaign.amountRaised / campaign.targetAmount) * 100).toFixed(2)}% funded</CampaignInfo>
                        {!campaign.completed && (
                          <DonateButton onClick={() => handleDonate(campaign.title)}>Donate</DonateButton>
                        )}
                      </CampaignCard>
                    ))}
                  </CampaignGrid>
                </>
              } />
              <Route path="/" element={<ActiveCampaigns />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/create" element={<CreateFundraiser />} />
            </Routes>
          </ContentContainer>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}
