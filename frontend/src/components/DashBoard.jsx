import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Web3 from 'web3';

const GET_USER_DATA = gql`
  query GetUserData($userAddress: String!) {
    user(id: $userAddress) {
      id
      userType
      condition
      hospital {
        id
        name
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

  const { loading, error, data } = useQuery(GET_USER_DATA, {
    variables: { userAddress: account },
    skip: !account,
  });

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <div style={{ color: 'red' }}>Error: {error.message}</div>;

  return (
    <div style={{ padding: '24px', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center' }}>Welcome to Your Dashboard</h1>
      {!account ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '16px' }}>Connect your wallet to access your fundraisers, track donations, and manage your account.</p>
          <button onClick={connectWallet} style={{ padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Connect Wallet</button>
        </div>
      ) : (
        <div>
          <p style={{ marginBottom: '16px', textAlign: 'center' }}>Your account: {account}</p>
          {data?.user && (
            <div style={{ marginBottom: '24px', padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: 'white' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>User Information</h2>
              <p><strong>User Type:</strong> {data.user.userType}</p>
              <p><strong>Condition:</strong> {data.user.condition || 'N/A'}</p>
              <p><strong>Associated Hospital:</strong> {data.user.hospital?.name || 'N/A'}</p>
            </div>
          )}
          {data?.user?.fundraisers && data.user.fundraisers.length > 0 && (
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: 'white' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Your Fundraisers</h2>
              {data.user.fundraisers.map((fundraiser, index) => (
                <div key={fundraiser.id} style={{ marginBottom: '16px', padding: '16px', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
                  <h3 style={{ fontWeight: 'bold' }}>Fundraiser {index + 1}</h3>
                  <p><strong>Target:</strong> {web3.utils.fromWei(fundraiser.targetAmount, 'ether')} ETH</p>
                  <p><strong>Raised:</strong> {web3.utils.fromWei(fundraiser.amountRaised, 'ether')} ETH</p>
                  <p><strong>Condition:</strong> {fundraiser.condition}</p>
                  <p><strong>Description:</strong> {fundraiser.description}</p>
                  <p><strong>Status:</strong> {fundraiser.completed ? 'Completed' : 'Ongoing'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;