import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

export const SUPPORTED_CHAIN_ID = 84532;

const basesepolia = {
  chainId: 84532,
  name: "Base sepolia",
  currency: "sepolia",
  explorerUrl: "https://sepolia.basescan.org/",
  rpcUrl: import.meta.env.VITE_RPC_URL,
};

const metadata = {
  name: "crowd-health",
  description: "A hospital crowdfund platform",
  url: "http://localhost:5173/", // origin must match your domain & subdomain
  icons: ["http://localhost:5173/"],
};

export const configWeb3Modal = () =>
  createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [basesepolia],
    projectId: import.meta.env.VITE_PROJECT_ID,
    enableAnalytics: false, // Optional - defaults to your Cloud configuration
  });
