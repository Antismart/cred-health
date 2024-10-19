import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Web3 from 'web3';
import Navigation from './components/Navigation';
import AboutUs from './components/AboutUs';
import DashBoard from './components/DashBoard';
import CreateFundraiser from './components/CreateFundraiser';
import LandingPage from './components/LandingPage';
import { configWeb3Modal } from "./connection";
import theme from './theme';
import './App.css';
import contractABI from './contracts/abi/med.json';
import Layout from './layout';
import ActiveCampaigns from './components/ActiveCampaigns';

// web3 Modal configuration function call
configWeb3Modal();

const AppContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  min-height: 100vh;
  font-family: ${props => props.theme.fonts.main};
`;

export default function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');

  useEffect(() => {
    const initWeb3AndContract = async () => {
      // Initialize read-only Web3 instance for viewing campaigns
      const web3Instance = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_INFURA_KEY'));
      setWeb3(web3Instance);

          const contractAddress = '0xfbfEfD8C66FeaeD1F0207FBa7262855799b0e59e'; // Replace with your contract address
          const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContract(contractInstance);

      try {
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
        console.error('Error fetching campaigns', error);
      }
    };

    initWeb3AndContract();
  }, []);

  const handleDonate = (campaign) => {
    setSelectedCampaign(campaign);
    setShowModal(true);
  };

  const handleConfirmDonation = async () => {
    if (!web3 || !contract || !selectedCampaign) return;

    try {
      const amountInWei = web3.utils.toWei(donationAmount, 'ether');
      
      // Get the connected account from Web3Modal provider
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (!accounts || accounts.length === 0) {
        alert('Please connect your wallet first');
        return;
      }
      const account = accounts[0];

      console.log('Estimating gas...');
      const gasEstimate = await contract.methods.donateToFundraiser(selectedCampaign.id).estimateGas({
        from: account,
        value: amountInWei
      });
      
      console.log('Getting gas price...');
      const gasPrice = await web3.eth.getGasPrice();
      
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
          <Routes>
            <Route path="/" element={<Layout fullBackground><LandingPage /></Layout>} />
            <Route path="/campaigns" element={<Layout><ActiveCampaigns campaigns={campaigns} web3={web3} handleDonate={handleDonate} /></Layout>} />
            <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />
            <Route path="/dashboard" element={<Layout><DashBoard /></Layout>} />
            <Route path="/create" element={<Layout><CreateFundraiser /></Layout>} />
          </Routes>
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
