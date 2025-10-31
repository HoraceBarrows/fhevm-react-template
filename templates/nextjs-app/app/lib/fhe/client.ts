import { createFhevmInstance } from '@fhevm/sdk';
import { ethers } from 'ethers';

/**
 * Client-side FHE operations
 * Handles FHEVM instance creation and client operations
 */

let fhevmInstance: any = null;

export interface FHEClientConfig {
  chainId: number;
  rpcUrl: string;
  gatewayUrl?: string;
}

/**
 * Initialize FHEVM client instance
 */
export async function initializeFHEClient(
  config: FHEClientConfig,
  provider: ethers.Provider
) {
  try {
    if (fhevmInstance) {
      return fhevmInstance;
    }

    fhevmInstance = await createFhevmInstance(
      {
        chainId: config.chainId,
        rpcUrl: config.rpcUrl,
        gatewayUrl: config.gatewayUrl || 'https://gateway.zama.ai',
      },
      provider
    );

    return fhevmInstance;
  } catch (error) {
    console.error('Failed to initialize FHE client:', error);
    throw new Error(
      `FHE client initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Get the current FHEVM instance
 */
export function getFHEClient() {
  if (!fhevmInstance) {
    throw new Error('FHE client not initialized. Call initializeFHEClient first.');
  }
  return fhevmInstance;
}

/**
 * Encrypt a value using the FHE client
 */
export async function encryptValue(
  value: number | bigint | boolean | string,
  type: string = 'uint32'
) {
  const client = getFHEClient();

  try {
    const encrypted = await client.encrypt(value, type);
    return encrypted;
  } catch (error) {
    throw new Error(
      `Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Decrypt a value using the FHE client
 */
export async function decryptValue(
  handle: string,
  contractAddress: string,
  userAddress?: string
) {
  const client = getFHEClient();

  try {
    const decrypted = await client.decrypt(handle, contractAddress, userAddress);
    return decrypted;
  } catch (error) {
    throw new Error(
      `Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Get the public key for encryption
 */
export function getPublicKey(): string | null {
  try {
    const client = getFHEClient();
    return client.getPublicKey();
  } catch (error) {
    console.error('Failed to get public key:', error);
    return null;
  }
}

/**
 * Check if FHE client is initialized
 */
export function isClientInitialized(): boolean {
  return fhevmInstance !== null;
}

/**
 * Reset the FHE client instance
 */
export function resetFHEClient() {
  fhevmInstance = null;
}
