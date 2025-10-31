import { useState, useCallback, useEffect } from 'react';
import { useFhevmInstance } from '@fhevm/sdk/react';

/**
 * Custom hook for FHE operations
 * Provides easy access to FHEVM instance and common operations
 */
export function useFHE() {
  const instance = useFhevmInstance();
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (instance) {
      setIsInitialized(true);
      setError(null);
    } else {
      setIsInitialized(false);
    }
  }, [instance]);

  const encrypt = useCallback(
    async (value: number | bigint | boolean, type: string = 'uint32') => {
      if (!instance) {
        throw new Error('FHEVM instance not initialized');
      }

      try {
        setError(null);
        // Use the SDK's encryption method
        const encrypted = await instance.encrypt(value, type);
        return encrypted;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Encryption failed';
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    [instance]
  );

  const decrypt = useCallback(
    async (handle: string, contractAddress: string) => {
      if (!instance) {
        throw new Error('FHEVM instance not initialized');
      }

      try {
        setError(null);
        // Use the SDK's decryption method
        const decrypted = await instance.decrypt(handle, contractAddress);
        return decrypted;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Decryption failed';
        setError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    [instance]
  );

  const getPublicKey = useCallback(() => {
    if (!instance) {
      return null;
    }
    return instance.getPublicKey();
  }, [instance]);

  return {
    instance,
    isInitialized,
    error,
    encrypt,
    decrypt,
    getPublicKey,
  };
}
