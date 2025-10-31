import { useState, useCallback } from 'react';
import { useEncryptedInput } from '@fhevm/sdk/react';

export type EncryptionType = 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'bool' | 'address';

interface UseEncryptionOptions {
  type?: EncryptionType;
  onSuccess?: (encrypted: any) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook for encrypting input values
 * Wraps the SDK's useEncryptedInput with additional state management
 */
export function useEncryption(options: UseEncryptionOptions = {}) {
  const { type = 'uint32', onSuccess, onError } = options;
  const { encrypted, encrypt: sdkEncrypt, isEncrypting, error: sdkError } = useEncryptedInput(type);

  const [lastEncrypted, setLastEncrypted] = useState<any>(null);

  const encrypt = useCallback(
    async (value: number | bigint | boolean | string) => {
      try {
        const result = await sdkEncrypt(value);
        setLastEncrypted(result);

        if (onSuccess && result) {
          onSuccess(result);
        }

        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Encryption failed');

        if (onError) {
          onError(error);
        }

        throw error;
      }
    },
    [sdkEncrypt, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setLastEncrypted(null);
  }, []);

  return {
    encrypt,
    encrypted: encrypted || lastEncrypted,
    isEncrypting,
    error: sdkError,
    reset,
  };
}

/**
 * Hook for batch encryption of multiple values
 */
export function useBatchEncryption() {
  const [results, setResults] = useState<any[]>([]);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const encryptBatch = useCallback(
    async (values: Array<{ value: any; type: EncryptionType }>) => {
      setIsEncrypting(true);
      setError(null);
      const encrypted: any[] = [];

      try {
        for (const item of values) {
          // In a real implementation, this would use the SDK's batch encryption
          // For now, we'll simulate individual encryptions
          const result = {
            data: `0x${Buffer.from(String(item.value)).toString('hex')}`,
            type: item.type,
            timestamp: Date.now(),
          };
          encrypted.push(result);
        }

        setResults(encrypted);
        return encrypted;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Batch encryption failed';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsEncrypting(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    encryptBatch,
    results,
    isEncrypting,
    error,
    reset,
  };
}
