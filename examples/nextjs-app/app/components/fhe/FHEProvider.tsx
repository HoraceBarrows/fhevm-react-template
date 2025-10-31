'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useProvider } from 'wagmi';
import { initializeFHEClient, getFHEClient, isClientInitialized } from '../../lib/fhe/client';
import type { FHEInstance, FHEInstanceConfig, FHEProviderState } from '../../types/fhe';

const FHEContext = createContext<FHEProviderState | null>(null);

export function useFHEContext() {
  const context = useContext(FHEContext);
  if (!context) {
    throw new Error('useFHEContext must be used within FHEProvider');
  }
  return context;
}

interface FHEProviderProps {
  children: React.ReactNode;
  config: FHEInstanceConfig;
  autoInit?: boolean;
}

export function FHEProvider({ children, config, autoInit = true }: FHEProviderProps) {
  const provider = useProvider();
  const [state, setState] = useState<FHEProviderState>({
    instance: null,
    isInitialized: false,
    isInitializing: false,
    error: null,
    config,
  });

  useEffect(() => {
    if (autoInit && provider && !isClientInitialized() && !state.isInitializing) {
      initializeClient();
    }
  }, [provider, autoInit]);

  const initializeClient = async () => {
    setState((prev) => ({ ...prev, isInitializing: true, error: null }));

    try {
      const instance = await initializeFHEClient(config, provider);

      setState((prev) => ({
        ...prev,
        instance,
        isInitialized: true,
        isInitializing: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to initialize FHE';

      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isInitializing: false,
        isInitialized: false,
      }));
    }
  };

  return <FHEContext.Provider value={state}>{children}</FHEContext.Provider>;
}
