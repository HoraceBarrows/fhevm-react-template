/**
 * FHE-related TypeScript type definitions
 * Core types for FHE operations in the application
 */

export type FHEDataType = 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256' | 'bool' | 'address';

export interface EncryptedValue {
  data: string;
  type: FHEDataType;
  handle?: string;
  timestamp?: number;
}

export interface DecryptedValue {
  value: string | number | boolean;
  type: FHEDataType;
  timestamp?: number;
  verified?: boolean;
}

export interface EncryptionOptions {
  type?: FHEDataType;
  publicKey?: string;
  nonce?: string;
}

export interface DecryptionOptions {
  contractAddress: string;
  userAddress: string;
  signature?: string;
  timeout?: number;
}

export interface FHEInstanceConfig {
  chainId: number;
  rpcUrl: string;
  gatewayUrl?: string;
  networkName?: string;
}

export interface FHEInstance {
  encrypt: (value: any, type?: FHEDataType) => Promise<EncryptedValue>;
  decrypt: (handle: string, contractAddress: string, userAddress?: string) => Promise<DecryptedValue>;
  getPublicKey: () => string | null;
  isReady: () => boolean;
}

export interface KeyPairInfo {
  address: string;
  publicKey: string;
  algorithm: 'TFHE';
  created: number;
  lastUsed?: number;
}

export interface EncryptionState {
  isEncrypting: boolean;
  encrypted: EncryptedValue | null;
  error: string | null;
}

export interface DecryptionState {
  isDecrypting: boolean;
  decrypted: DecryptedValue | null;
  error: string | null;
}

export interface FHEProviderState {
  instance: FHEInstance | null;
  isInitialized: boolean;
  isInitializing: boolean;
  error: string | null;
  config: FHEInstanceConfig | null;
}

export type FHEOperation = 'encrypt' | 'decrypt' | 'compute' | 'getKeys';

export interface FHEOperationResult<T = any> {
  success: boolean;
  operation: FHEOperation;
  data?: T;
  error?: string;
  timestamp: number;
}
