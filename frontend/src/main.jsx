import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';  // Import ApolloProvider and required dependencies
import App from './App.jsx';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/88684/cred/version/latest',  // Replace with your actual GraphQL endpoint
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>  {/* Wrap your App with ApolloProvider */}
      <App />
    </ApolloProvider>
  </StrictMode>
);
