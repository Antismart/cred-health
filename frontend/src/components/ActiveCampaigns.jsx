import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import styled from 'styled-components';
import contractABI from '../contracts/abi/med.json';
import backgroundImage from '/assets/home.png'; 

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;

const ContentWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const CampaignGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const CampaignCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  aspect-ratio: 1 / 1;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CampaignTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

const CampaignDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  background-color: #e0e0e0;
  border-radius: 10px;
  height: 8px;
  margin-bottom: 0.75rem;
  overflow: hidden;
`;

const Progress = styled.div`
  background-color: #4caf50;
  height: 100%;
  width: ${(props) => props.width};
`;

const CampaignInfo = styled.div`
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #1976d2;
  }
`;

const ErrorMessage = styled.p`
  color: #f44336;
  text-align: center;
  font-size: 1rem;
  margin-bottom: 1rem;
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
          const contractAddress = '0xfbfEfD8C66FeaeD1F0207FBa7262855799b0e59e';
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
      <ContentWrapper>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <CampaignGrid>
          {campaigns.map((campaign, index) => (
            <CampaignCard key={index}>
              <div>
                <CampaignTitle>{campaign.description}</CampaignTitle>
                <CampaignDescription>Condition: {campaign.condition}</CampaignDescription>
                <ProgressBar>
                  <Progress width={`${(campaign.amountRaised / campaign.targetAmount) * 100}%`} />
                </ProgressBar>
                <CampaignInfo>
                  {web3 && `${web3.utils.fromWei(campaign.amountRaised, 'ether')} ETH raised of ${web3.utils.fromWei(campaign.targetAmount, 'ether')} ETH target`}
                </CampaignInfo>
              </div>
              {!campaign.completed && (
                <Button onClick={() => handleDonate(index)}>Donate</Button>
              )}
            </CampaignCard>
          ))}
        </CampaignGrid>
      </ContentWrapper>
    </PageContainer>
  );
}