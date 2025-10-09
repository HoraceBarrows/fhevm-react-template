/**
 * React hooks for FHEVM SDK
 * Provides a wagmi-like API for React applications
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { getFhevmClient, isFhevmInitialized } from './init';
import { encryptInput, decryptOutput } from './encryption';
import type {
  EncryptedInput,
  DecryptionRequest,
  UseEncryptedInputOptions,
  UseEncryptedInputResult,
  UseDecryptionResult,
  ContractOptions
} from './types';
import type { Contract } from 'ethers';

/**
 * Hook to get FHEVM instance
 * Throws if not initialized
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const client = useFhevmInstance();
 *   // Use client...
 * }
 * ```
 */
export function useFhevmInstance() {
  if (!isFhevmInitialized()) {
    throw new Error('FHEVM not initialized. Call initializeFhevm() in your app root.');
  }
  return getFhevmClient();
}

/**
 * Hook for encrypting input values
 * Similar to wagmi's useContractWrite but for encryption
 *
 * @example
 * ```tsx
 * function OrderForm() {
 *   const { encrypted, isEncrypting, encrypt } = useEncryptedInput();
 *
 *   const handleSubmit = async (quantity: number) => {
 *     await encrypt(quantity);
 *     // Use encrypted.data to call contract
 *   };
 *
 *   return <button onClick={() => handleSubmit(10)}>Place Order</button>;
 * }
 * ```
 */
export function useEncryptedInput(
  type: 'uint32' | 'uint64' | 'bool' | 'address' = 'uint32',
  options: UseEncryptedInputOptions = {}
): UseEncryptedInputResult {
  const [encrypted, setEncrypted] = useState<EncryptedInput | null>(null);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encrypt = useCallback(
    async (value: any) => {
      setIsEncrypting(true);
      setError(null);

      try {
        const result = await encryptInput(value, type);
        setEncrypted(result);
        options.onSuccess?.(result);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        options.onError?.(error);
      } finally {
        setIsEncrypting(false);
      }
    },
    [type, options]
  );

  const reset = useCallback(() => {
    setEncrypted(null);
    setError(null);
    setIsEncrypting(false);
  }, []);

  return {
    encrypted,
    isEncrypting,
    error,
    encrypt,
    reset
  };
}

/**
 * Hook for decrypting output values
 * Handles the EIP-712 signature flow
 *
 * @example
 * ```tsx
 * function OrderDetails({ orderId }: { orderId: number }) {
 *   const { decrypted, isDecrypting, decrypt } = useDecryption();
 *
 *   const handleReveal = async () => {
 *     await decrypt({
 *       contractAddress: '0x...',
 *       handle: '0x...',
 *       userAddress: address
 *     });
 *   };
 *
 *   return (
 *     <div>
 *       {isDecrypting ? 'Decrypting...' : `Quantity: ${decrypted}`}
 *       <button onClick={handleReveal}>Reveal</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useDecryption(): UseDecryptionResult {
  const [decrypted, setDecrypted] = useState<any>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const decrypt = useCallback(async (request: DecryptionRequest) => {
    setIsDecrypting(true);
    setError(null);

    try {
      const result = await decryptOutput(request);
      setDecrypted(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
    } finally {
      setIsDecrypting(false);
    }
  }, []);

  const reset = useCallback(() => {
    setDecrypted(null);
    setError(null);
    setIsDecrypting(false);
  }, []);

  return {
    decrypted,
    isDecrypting,
    error,
    decrypt,
    reset
  };
}

/**
 * Hook for interacting with FHEVM contracts
 * Provides a simplified API for contract interactions
 *
 * @example
 * ```tsx
 * function ProductList() {
 *   const contract = useFhevmContract({
 *     address: '0x...',
 *     abi: contractABI,
 *     signerOrProvider: signer
 *   });
 *
 *   const createProduct = async () => {
 *     const tx = await contract.createProduct(...args);
 *     await tx.wait();
 *   };
 *
 *   return <button onClick={createProduct}>Create Product</button>;
 * }
 * ```
 */
export function useFhevmContract(options: ContractOptions): Contract {
  const client = useFhevmInstance();
  const contractRef = useRef<Contract | null>(null);

  if (!contractRef.current) {
    contractRef.current = client.getContract(options);
  }

  return contractRef.current;
}

/**
 * Hook for watching encrypted state changes
 * Polls the contract and decrypts values when they change
 *
 * @example
 * ```tsx
 * function Stats({ productId }: { productId: number }) {
 *   const stats = useEncryptedState(
 *     contract,
 *     'productStats',
 *     [productId],
 *     { pollingInterval: 5000 }
 *   );
 *
 *   return <div>Total Orders: {stats?.totalParticipants}</div>;
 * }
 * ```
 */
export function useEncryptedState<T = any>(
  contract: Contract,
  functionName: string,
  args: any[] = [],
  options: { pollingInterval?: number } = {}
): T | null {
  const [state, setState] = useState<T | null>(null);
  const pollingInterval = options.pollingInterval || 10000;

  useEffect(() => {
    let mounted = true;

    const fetchState = async () => {
      try {
        const result = await contract[functionName](...args);
        if (mounted) {
          setState(result);
        }
      } catch (error) {
        console.error('Error fetching encrypted state:', error);
      }
    };

    fetchState();
    const interval = setInterval(fetchState, pollingInterval);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [contract, functionName, JSON.stringify(args), pollingInterval]);

  return state;
}
