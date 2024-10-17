import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Web3 from 'web3';
import Navigation from './components/Navigation';
import AboutUs from './components/AboutUs';
import DashBoard from './components/DashBoard';
import CreateFundraiser from './components/CreateFundraiser';
import ActiveCampaigns from './components/ActiveCampaigns';
import LandingPage from './components/LandingPage';
import { configWeb3Modal } from "./connection";

import theme from './theme';
import './App.css';
import contractABI from './contracts/abi/med.json';


//web3 Modal configuration function call
configWeb3Modal();

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



export default function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          const contractAddress = '0xfbfefd8c66feaed1f0207fba7262855799b0e59e'; // Replace with your contract address
          const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContract(contractInstance);

          // Fetch active fundraisers from the contract
          const fundraiserCount = await contractInstance.methods.fundraiserCounter().call();
          const fetchedCampaigns = [];
          for (let i = 0; i < fundraiserCount; i++) {
            const fundraiser = await contractInstance.methods.getFundraiserDetails(i).call();
            fetchedCampaigns.push({
              id: i,
              title: fundraiser.condition,
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

  const handleDonate = (campaign) => {
    setSelectedCampaign(campaign);
    setShowModal(true);
  };

  const handleConfirmDonation = async () => {
    if (!web3 || !contract || !account || !selectedCampaign) return;

    try {
      const amountInWei = web3.utils.toWei(donationAmount, 'ether');

      console.log('Estimating gas...');
      const gasEstimate = await contract.methods.donateToFundraiser(selectedCampaign.id).estimateGas({
        from: account,
        value: amountInWei
      });
      console.log('Gas estimate:', gasEstimate.toString());

      console.log('Getting gas price...');
      const gasPrice = await web3.eth.getGasPrice();
      console.log('Gas price:', gasPrice.toString());

      const gasLimit = BigInt(gasEstimate) * BigInt(120) / BigInt(100);

      console.log('Sending transaction...');
      const result = await contract.methods.donateToFundraiser(selectedCampaign.id).send({
        from: account,
        value: amountInWei,
        gas: gasLimit.toString(),
        gasPrice: gasPrice
      });

      console.log('Transaction result:', result);

      const updatedCampaigns = campaigns.map(c =>
        c.id === selectedCampaign.id
          ? { ...c, amountRaised: (BigInt(web3.utils.toWei(c.amountRaised, 'ether')) + BigInt(amountInWei)).toString() }
          : c
      );
      setCampaigns(updatedCampaigns);

      setShowModal(false);
      setDonationAmount('');
      alert('Donation successful!');
    } catch (error) {
      console.error('Detailed error:', error);
      alert('Error making donation. Please check the console for more details.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContainer>
          <Navigation />
          <ContentContainer>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/campaigns"
                element={
                  <>
                    <SectionTitle>Active Campaigns</SectionTitle>
                    <CampaignGrid>
                      {campaigns.map((campaign, index) => (
                        <CampaignCard key={index} campaign={campaign} web3={web3} handleDonate={handleDonate} />
                      ))}
                    </CampaignGrid>
                  </>
                }
              />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/create" element={<CreateFundraiser />} />
              {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
            </Routes>
          </ContentContainer>
        </AppContainer>
      </Router>
      {showModal && (
        <Modal>
          <ModalContent>
            <h3>Donate to {selectedCampaign.title}</h3>
            <Input
              type="number"
              step="0.000000000000000001"
              min="0"
              placeholder="Amount in ETH"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
            />
            <DonateButton onClick={handleConfirmDonation}>Confirm Donation</DonateButton>
            <DonateButton onClick={() => setShowModal(false)}>Cancel</DonateButton>
          </ModalContent>
        </Modal>
      )}
    </ThemeProvider>
  );
}

const CampaignCard = ({ campaign, web3, handleDonate }) => {
  const calculateProgressPercentage = () => {
    if (!web3) return 0;

    const amountRaised = BigInt(web3.utils.toWei(campaign.amountRaised, 'ether'));
    const targetAmount = BigInt(web3.utils.toWei(campaign.targetAmount, 'ether'));

    if (targetAmount === BigInt(0)) return 0;

    const progressPercentage = Number((amountRaised * BigInt(10000)) / targetAmount) / 100;
    return Math.min(progressPercentage, 100);
  };

  const progressPercentage = calculateProgressPercentage();

  return (
    <CampaignCardWrapper>
      <CampaignTitle>{campaign.title}</CampaignTitle>
      <CampaignDescription>{campaign.description}</CampaignDescription>
      <ProgressBar>
        <Progress width={progressPercentage} />
      </ProgressBar>
      <CampaignInfo>{progressPercentage.toFixed(2)}% funded</CampaignInfo>
      <CampaignInfo>
        {parseFloat(campaign.amountRaised).toFixed(4)} / {parseFloat(campaign.targetAmount).toFixed(4)} ETH raised
      </CampaignInfo>
      {!campaign.completed && <DonateButton onClick={() => handleDonate(campaign)}>Donate</DonateButton>}
    </CampaignCardWrapper>
  );
};