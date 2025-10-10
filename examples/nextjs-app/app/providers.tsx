'use client';

import { useEffect, ReactNode } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { initializeFhevm } from '@fhevm/sdk';
import { useWalletClient } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';

// Configure Wagmi
const config = getDefaultConfig({
  appName: 'FHEVM SDK Demo',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || 'demo',
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(process.env.NEXT_PUBLIC_RPC_URL),
  },
});

const queryClient = new QueryClient();

/**
 * FHEVM Initialization Component
 * Initializes FHEVM SDK when wallet is connected
 */
function FhevmInitializer({ children }: { children: ReactNode }) {
  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    if (walletClient) {
      initializeFhevm(
        {
          chainId: sepolia.id,
          rpcUrl: process.env.NEXT_PUBLIC_RPC_URL!,
          gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL,
        },
        walletClient
      ).then(() => {
        console.log('✅ FHEVM SDK initialized');
      }).catch((error) => {
        console.error('❌ Failed to initialize FHEVM SDK:', error);
      });
    }
  }, [walletClient]);

  return <>{children}</>;
}

/**
 * Root Providers Component
 * Wraps app with all necessary providers
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <FhevmInitializer>{children}</FhevmInitializer>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
