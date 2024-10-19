import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Button } from './ui/Button';
import contractABI from '../contracts/abi/med.json';
import backgroundImage from '/assets/home.png';
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import Web3 from 'web3';

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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const CampaignCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 16px rgba(128, 0, 128, 0.7); /* Purple glow */
  }
`;

const CampaignTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const ProgressBarContainer = styled.div`
  background-color: #e0e0e0;
  border-radius: 12px;
  height: 10px;
  width: 100%;
  margin-bottom: 1rem;
  overflow: hidden;
  position: relative;
`;

const Progress = styled.div`
  background-color: #9b59b6; /* Purple color */
  height: 100%;
  width: ${(props) => (props.width ? `${props.width}%` : '0%')};
  transition: width 0.3s ease-in-out;
`;

const CampaignInfo = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 1.5rem;
`;

const InputAmount = styled.input`
  width: 60%;
  padding: 0.5rem;
  font-size: 0.9rem;
  color: #34495e;
  border: 2px solid #bdc3c7;
  border-radius: 8px;
  margin: 1rem 0;
  display: block;
  outline: none;

  &:focus {
    border-color: #9b59b6; /* Purple border on focus */
  }
`;

const DonateButton = styled(Button)`
  background-color: #8e44ad; /* Purple */
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0.5rem 1.25rem; /* Smaller padding */
  border-radius: 30px; /* Make it more rounded */
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #732d91;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  text-align: center;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export default function ActiveCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const { address, isConnected } = useWeb3ModalAccount();

  const initWeb3AndContract = useCallback(async () => {
    if (!isConnected || !address) return;

    try {
      const provider = new Web3(window.ethereum);
      const contractAddress = '0xfbfEfD8C66FeaeD1F0207FBa7262855799b0e59e'; 
      const contractInstance = new provider.eth.Contract(contractABI, contractAddress);
      setContract(contractInstance);

      await fetchActiveCampaigns(contractInstance, provider);
    } catch (error) {
      console.error("Error initializing Web3Modal", error);
      setError("Failed to connect wallet. Please try again.");
    }
  }, [isConnected, address]);

  useEffect(() => {
    initWeb3AndContract();

    // Poll campaigns every 30 seconds
    const intervalId = setInterval(() => {
      if (contract) {
        fetchActiveCampaigns(contract, new Web3(window.ethereum));
      }
    }, 30000); // 30 seconds

    // Clean up interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [initWeb3AndContract, contract]);

  const fetchActiveCampaigns = async (contractInstance, web3Instance) => {
    try {
      const fundraiserCounter = await contractInstance.methods.fundraiserCounter().call();
      const campaigns = [];
      for (let i = 0; i < fundraiserCounter; i++) {
        const fundraiser = await contractInstance.methods.getFundraiserDetails(i).call();
        campaigns.push({
          ...fundraiser,
          amountRaised: web3Instance.utils.fromWei(fundraiser.amountRaised, 'ether'),
          targetAmount: web3Instance.utils.fromWei(fundraiser.targetAmount, 'ether')
        });
      }
      setCampaigns(campaigns);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setError('Failed to fetch active campaigns.');
    }
  };

  const handleDonateClick = (campaignId) => {
    setSelectedCampaign(campaignId);
  };

  const handleDonate = async () => {
    if (!contract || !address || selectedCampaign === null) {
      setError('Web3 is not initialized. Please check your connection.');
      return;
    }
    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      setError('Please enter a valid donation amount.');
      return;
    }

    try {
      const amountInWei = Web3.utils.toWei(donationAmount, 'ether');
      await contract.methods.donateToFundraiser(selectedCampaign).send({ from: address, value: amountInWei });
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

        {isConnected ? (
          <CampaignGrid>
            {campaigns.map((campaign, index) => (
              <CampaignCard key={index}>
                <div>
                  <CampaignTitle>{campaign.description}</CampaignTitle>
                  <ProgressBarContainer>
                    <Progress width={(campaign.amountRaised / campaign.targetAmount) * 100} />
                  </ProgressBarContainer>
                  <CampaignInfo>
                    {`${campaign.amountRaised} ETH raised of ${campaign.targetAmount} ETH target`}
                  </CampaignInfo>
                </div>
                {!campaign.completed && (
                  <>
                    {selectedCampaign === index && (
                      <InputAmount
                        type="number"
                        placeholder="Enter amount to donate"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                      />
                    )}
                    <DonateButton onClick={() => (selectedCampaign === index ? handleDonate() : handleDonateClick(index))}>
                      {selectedCampaign === index ? 'Confirm Donation' : 'Donate'}
                    </DonateButton>
                  </>
                )}
              </CampaignCard>
            ))}
          </CampaignGrid>
        ) : (
          <ErrorMessage>Please connect your wallet to view campaigns.</ErrorMessage>
        )}
      </ContentWrapper>
    </PageContainer>
  );
}
