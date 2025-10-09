/**
 * Initialization utilities for FHEVM SDK
 */

import { FhevmClient } from './client';
import type { FhevmConfig, FhevmInstance } from './types';
import type { Provider, Signer } from 'ethers';

/**
 * Global FHEVM client instance
 */
let globalClient: FhevmClient | null = null;

/**
 * Create a new FHEVM instance
 *
 * @example
 * ```typescript
 * const client = await createFhevmInstance({
 *   chainId: 11155111,
 *   rpcUrl: 'https://sepolia.infura.io/v3/YOUR_KEY',
 *   aclAddress: '0x...',
 *   gatewayUrl: 'https://gateway.zama.ai'
 * }, provider);
 * ```
 */
export async function createFhevmInstance(
  config: FhevmConfig,
  providerOrSigner: Provider | Signer
): Promise<FhevmClient> {
  const client = new FhevmClient(config);
  await client.initialize(providerOrSigner);
  return client;
}

/**
 * Initialize global FHEVM client
 * This should be called once at application startup
 *
 * @example
 * ```typescript
 * // In your app initialization
 * await initializeFhevm({
 *   chainId: 11155111,
 *   rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
 * }, provider);
 *
 * // Later in your app
 * const client = getFhevmClient();
 * ```
 */
export async function initializeFhevm(
  config: FhevmConfig,
  providerOrSigner: Provider | Signer
): Promise<FhevmClient> {
  if (globalClient) {
    console.warn('FHEVM client already initialized');
    return globalClient;
  }

  globalClient = await createFhevmInstance(config, providerOrSigner);
  return globalClient;
}

/**
 * Get the global FHEVM client instance
 * Throws if not initialized
 */
export function getFhevmClient(): FhevmClient {
  if (!globalClient) {
    throw new Error(
      'FHEVM client not initialized. Call initializeFhevm() first.'
    );
  }
  return globalClient;
}

/**
 * Reset global client (useful for testing)
 */
export function resetFhevmClient(): void {
  globalClient = null;
}

/**
 * Check if global client is initialized
 */
export function isFhevmInitialized(): boolean {
  return globalClient !== null && globalClient.isInitialized();
}
