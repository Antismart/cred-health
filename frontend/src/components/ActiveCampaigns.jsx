import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import styled from 'styled-components';
import contractABI from '../contracts/abi/med.json';

// Styled Components for the UI
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.large};
  max-width: 600px;
  margin: 0 auto;
`;

const CampaignGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${(props) => props.theme.spacing.large};
`;

const CampaignCard = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  border-radius: ${(props) => props.theme.borderRadius.medium};
  padding: ${(props) => props.theme.spacing.large};

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const CampaignTitle = styled.h3`
  color: ${(props) => props.theme.colors.text};
  margin-bottom: ${(props) => props.theme.spacing.small};
`;

const CampaignDescription = styled.p`
  color: ${(props) => props.theme.colors.secondaryText};
  margin-bottom: ${(props) => props.theme.spacing.small};
`;

const ProgressBar = styled.div`
  background-color: ${(props) => props.theme.colors.progressBackground};
  border-radius: ${(props) => props.theme.borderRadius.small};
  height: 8px;
  margin-bottom: ${(props) => props.theme.spacing.small};
  overflow: hidden;
`;

const Progress = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  height: 100%;
  width: ${(props) => props.width};
`;

const CampaignInfo = styled.div`
  color: ${(props) => props.theme.colors.secondaryText};
  font-size: 0.9em;
`;

const Button = styled.button`
  padding: ${(props) => props.theme.spacing.small} ${(props) => props.theme.spacing.medium};
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.small};
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

export default function ActiveCampaigns() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
          const contractAddress = '0x018617918B6a1F8B6BBBbD5b30bd3A15D4B48B10'; // Ensure this is the correct address
          const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
          setContract(contractInstance);
          await fetchActiveCampaigns(contractInstance);
        } catch (error) {
          console.error("User denied account access or wrong contract address", error);
          setError("Failed to connect to Ethereum. Please check your MetaMask connection.");
        }
      } else {
        setError('Please install MetaMask!');
      }
    };

    initWeb3();
  }, []);

  // Function to fetch active campaigns from the smart contract
  const fetchActiveCampaigns = async (contractInstance) => {
    try {
      const fundraiserCounter = await contractInstance.methods.fundraiserCounter().call();

      const campaigns = [];
      for (let i = 0; i < fundraiserCounter; i++) {
        const fundraiser = await contractInstance.methods.getFundraiserDetails(i).call();
        campaigns.push(fundraiser);
      }
      setCampaigns(campaigns);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setError('Failed to fetch active campaigns.');
    }
  };

  const handleDonate = async (fundraiserId) => {
    if (!web3 || !contract || !account) {
      setError('Web3 is not initialized. Please check your MetaMask connection.');
      return;
    }
    try {
      // Allow users to donate 0.01 ETH for demo purposes (adjust as needed)
      const donationAmount = web3.utils.toWei('0.01', 'ether');
      await contract.methods.donateToFundraiser(fundraiserId).send({ from: account, value: donationAmount });
      alert('Donation successful!');
    } catch (error) {
      console.error('Error donating:', error);
      setError('Failed to donate.');
    }
  };

  return (
    <PageContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <CampaignGrid>
        {campaigns.map((campaign, index) => (
          <CampaignCard key={index}>
            <CampaignTitle>{campaign.description}</CampaignTitle>
            <CampaignDescription>Condition: {campaign.condition}</CampaignDescription>
            <ProgressBar>
              <Progress width={`${(campaign.amountRaised / campaign.targetAmount) * 100}%`} />
            </ProgressBar>
            <CampaignInfo>
              {web3.utils.fromWei(campaign.amountRaised, 'ether')} ETH raised of {web3.utils.fromWei(campaign.targetAmount, 'ether')} ETH target
            </CampaignInfo>
            {!campaign.completed && (
              <Button onClick={() => handleDonate(index)}>Donate</Button>
            )}
          </CampaignCard>
        ))}
      </CampaignGrid>
    </PageContainer>
  );
}
