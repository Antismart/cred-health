import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { ethers } from 'ethers';
import { Button } from './ui/Button';
import { LuLogIn } from "react-icons/lu";
import { WalletConnected } from "../utils/WalletConnected";
import { useWeb3Modal, useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import styled from 'styled-components';

// Styled Components
const DashboardContainer = styled.div`
  color: white;
  margin: 0;
  padding: 20px;
`;

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

// GraphQL Schema Debug Query
const GET_SCHEMA = gql`
  query {
    __schema {
      queryType {
        fields {
          name
          description
        }
      }
    }
  }
`;

// Main User Data Query
const GET_USER_DATA = gql`
  query GetAccountData($accountId: String!) {
    fundraisers(where: { creator: $accountId }) {
      id
      creator
      title
      description
      targetAmount
      amountRaised
      condition
      status
      timestamp
    }
    donors(where: { id: $accountId }) {
      id
      totalDonations
      donationsCount
    }
    hospitals(where: { id: $accountId }) {
      id
      name
      totalFundraisersProcessed
      totalAmountRaised
    }
  }
`;

const Dashboard = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  // Query for debugging schema
  const { data: schemaData, loading: schemaLoading, error: schemaError } = useQuery(GET_SCHEMA);

  // Main data query
  const { loading, error, data, refetch } = useQuery(GET_USER_DATA, {
    variables: { accountId: address?.toLowerCase() },
    skip: !address,
  });

  // Refetch data when wallet is connected
  React.useEffect(() => {
    if (isConnected && address) {
      refetch({ accountId: address.toLowerCase() });
    }
  }, [isConnected, address, refetch]);

  const formatEther = (value) => {
    try {
      return ethers.formatEther(value.toString());
    } catch (error) {
      console.error('Error formatting ether value:', error);
      return '0';
    }
  };

  const renderDonorInfo = () => {
    const donorData = data?.donors?.[0];
    if (!donorData) return null;

    return (
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-200">Donor Information</h2>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-300">
          <p><span className="font-medium">Total Donations:</span> {formatEther(donorData.totalDonations)} ETH</p>
          <p><span className="font-medium">Number of Donations:</span> {donorData.donationsCount}</p>
        </CardContent>
      </Card>
    );
  };

  const renderHospitalInfo = () => {
    const hospitalData = data?.hospitals?.[0];
    if (!hospitalData) return null;

    return (
      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-200">Hospital Information</h2>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-300">
          <p><span className="font-medium">Hospital Name:</span> {hospitalData.name}</p>
          <p><span className="font-medium">Total Fundraisers Processed:</span> {hospitalData.totalFundraisersProcessed}</p>
          <p><span className="font-medium">Total Amount Raised:</span> {formatEther(hospitalData.totalAmountRaised)} ETH</p>
        </CardContent>
      </Card>
    );
  };

  const renderFundraisers = () => {
    if (!data?.fundraisers || data.fundraisers.length === 0) {
      return (
        <Card>
          <CardContent>
            <p className="text-center text-gray-300">No fundraisers found.</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-200">Your Fundraisers</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.fundraisers.map((fundraiser, index) => (
            <Card key={fundraiser.id} className="bg-gray-800/30">
              <CardContent className="space-y-2 text-gray-300">
                <h3 className="font-semibold">{fundraiser.title || `Fundraiser ${index + 1}`}</h3>
                <p><span className="font-medium">Target:</span> {formatEther(fundraiser.targetAmount)} ETH</p>
                <p><span className="font-medium">Raised:</span> {formatEther(fundraiser.amountRaised)} ETH</p>
                <p><span className="font-medium">Progress:</span> {((Number(formatEther(fundraiser.amountRaised)) / Number(formatEther(fundraiser.targetAmount))) * 100).toFixed(2)}%</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ 
                      width: `${Math.min(((Number(formatEther(fundraiser.amountRaised)) / Number(formatEther(fundraiser.targetAmount))) * 100), 100)}%` 
                    }}
                  ></div>
                </div>
                <p><span className="font-medium">Condition:</span> {fundraiser.condition}</p>
                <p><span className="font-medium">Description:</span> {fundraiser.description}</p>
                <p><span className="font-medium">Created:</span> {new Date(Number(fundraiser.timestamp) * 1000).toLocaleDateString()}</p>
                <p><span className="font-medium">Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded ${fundraiser.status === 'COMPLETED' ? 'bg-green-600' : 'bg-blue-600'}`}>
                    {fundraiser.status}
                  </span>
                </p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    );
  };

  const renderSchemaData = () => {
    if (schemaLoading) return <p>Loading available queries...</p>;
    if (schemaError) return <p>Error loading schema: {schemaError.message}</p>;

    const queries = schemaData?.__schema?.queryType?.fields || [];
    if (queries.length === 0) return <p>No queries found in schema.</p>;

    return (
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-200">Available Queries</h2>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-gray-300">
            {queries.map((query) => (
              <li key={query.name}>
                <strong>{query.name}:</strong> {query.description || 'No description'}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-red-500 p-4 bg-red-100/10 rounded-lg">
          <p className="font-semibold">Error loading dashboard data:</p>
          <p>{error.message}</p>
        </div>
      );
    }
    
    if (!isConnected) {
      return (
        <div className="text-center">
          <p className="mb-4 text-gray-300">Connect your wallet to access your fundraisers, track donations, and manage your account.</p>
          <Button onClick={() => open()} className="text-gray-200 text-sm font-barlow px-4 py-2 flex items-center gap-2">
            <LuLogIn size={20} />
            Connect Wallet
          </Button>
        </div>
      );
    }

    return (
      <>
        {renderDonorInfo()}
        {renderHospitalInfo()}
        {renderFundraisers()}
        {renderSchemaData()}
      </>
    );
  };

  return (
    <DashboardContainer>
      <h1 className="text-3xl font-semibold text-gray-100 mb-6">Dashboard</h1>
      {renderContent()}
    </DashboardContainer>
  );
};

export default Dashboard;
