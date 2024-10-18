import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Web3 from 'web3';
import { Button } from './ui/Button';
import { LuLogIn } from "react-icons/lu";
import { WalletConnected } from "../utils/WalletConnected";
import { useWalletInfo, useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";

const Card = ({ children, className = "" }) => (
  <div className={`bg-gray-800/50 rounded-lg border border-gray-700 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-4 border-b border-gray-700 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

const GET_USER_DATA = gql`
  query GetUserData($userAddress: Bytes!) {
    user(id: $userAddress) {
      id
      userType
      condition
      hospital {
        id
        totalFundraisersProcessed
        totalAmountRaised
      }
      fundraisers {
        id
        targetAmount
        amountRaised
        condition
        description
        completed
      }
    }
  }
`;

const Dashboard = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  const { open } = useWeb3Modal()
  const { address, isConnected } = useWeb3ModalAccount()
  const { walletInfo } = useWalletInfo()

  const { loading, error, data } = useQuery(GET_USER_DATA, {
    variables: { userAddress: account?.toLowerCase() },
    skip: !account,
  });

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
        window.ethereum.on('accountsChanged', (accounts) => {
          setAccount(accounts[0]);
        });
      }
    };

    initWeb3();
  }, []);

  const renderUserInfo = () => {
    if (!data?.user) return null;
    return (
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-200">User Information</h2>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-300">
          <p><span className="font-medium">User Type:</span> {data.user.userType === '0' ? 'Patient' : 'Donor'}</p>
          <p><span className="font-medium">Condition:</span> {data.user.condition || 'N/A'}</p>
          {data.user.hospital && (
            <div className="space-y-2">
              <p><span className="font-medium">Associated Hospital:</span> {data.user.hospital.id}</p>
              <p><span className="font-medium">Total Fundraisers Processed:</span> {data.user.hospital.totalFundraisersProcessed}</p>
              <p><span className="font-medium">Total Amount Raised:</span> {web3.utils.fromWei(data.user.hospital.totalAmountRaised, 'ether')} ETH</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderFundraisers = () => {
    if (!data?.user?.fundraisers || data.user.fundraisers.length === 0) return null;
    return (
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-200">Your Fundraisers</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.user.fundraisers.map((fundraiser, index) => (
            <Card key={fundraiser.id} className="bg-gray-800/30">
              <CardContent className="space-y-2 text-gray-300">
                <h3 className="font-semibold">Fundraiser {index + 1}</h3>
                <p><span className="font-medium">Target:</span> {web3.utils.fromWei(fundraiser.targetAmount, 'ether')} ETH</p>
                <p><span className="font-medium">Raised:</span> {web3.utils.fromWei(fundraiser.amountRaised, 'ether')} ETH</p>
                <p><span className="font-medium">Condition:</span> {fundraiser.condition}</p>
                <p><span className="font-medium">Description:</span> {fundraiser.description}</p>
                <p><span className="font-medium">Status:</span> {fundraiser.completed ? 'Completed' : 'Ongoing'}</p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    );
  };

  if (loading) return <p className="text-center p-4 text-gray-300">Loading...</p>;
  if (error) return <div className="text-red-500 p-4">Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-200">Welcome to Your Dashboard</h1>
        {!account ? (
          <div className="text-center">
            <p className="mb-4 text-gray-300">Connect your wallet to access your fundraisers, track donations, and manage your account.</p>
            <Button onClick={() => open()} className="text-gray-200 text-sm font-barlow px-4 py-2 flex justify-center items-center gap-1 bg-sky-600 hover:bg-emerald-500">
              {isConnected ? 
                <WalletConnected address={address} icon={walletInfo?.icon} /> : 
                <>
                  <span>Connect Wallet</span>
                  <LuLogIn className="text-lg hidden md:flex" />
                </>
              }
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-center text-gray-300">Your account: {account}</p>
            {renderUserInfo()}
            {renderFundraisers()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;