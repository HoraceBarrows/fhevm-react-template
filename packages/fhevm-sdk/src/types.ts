/**
 * Type definitions for FHEVM SDK
 */

import type { Contract, Provider, Signer } from 'ethers';

/**
 * FHEVM initialization configuration
 */
export interface FhevmConfig {
  /** Network chain ID */
  chainId: number;
  /** RPC URL for the network */
  rpcUrl: string;
  /** Contract address for ACL (Access Control List) */
  aclAddress?: string;
  /** Gateway URL for decryption requests */
  gatewayUrl?: string;
  /** Public key for encryption */
  publicKey?: string;
}

/**
 * Encrypted input data structure
 */
export interface EncryptedInput {
  /** Encrypted data as bytes */
  data: Uint8Array;
  /** Input proof for verification */
  inputProof: string;
  /** Handles for encrypted values */
  handles: string[];
}

/**
 * Decryption request parameters
 */
export interface DecryptionRequest {
  /** Contract address containing encrypted data */
  contractAddress: string;
  /** Handle of the encrypted value to decrypt */
  handle: string;
  /** User address for permission verification */
  userAddress: string;
}

/**
 * Decryption result
 */
export interface DecryptionResult {
  /** Decrypted value */
  value: bigint | number | boolean | string;
  /** Original handle */
  handle: string;
  /** Whether decryption was successful */
  success: boolean;
}

/**
 * FHEVM instance interface
 */
export interface FhevmInstance {
  /** Encrypt a 32-bit unsigned integer */
  encrypt32(value: number): Promise<EncryptedInput>;
  /** Encrypt a 64-bit unsigned integer */
  encrypt64(value: bigint | number): Promise<EncryptedInput>;
  /** Encrypt a boolean value */
  encryptBool(value: boolean): Promise<EncryptedInput>;
  /** Encrypt an address */
  encryptAddress(address: string): Promise<EncryptedInput>;
  /** Request decryption of encrypted data */
  decrypt(request: DecryptionRequest): Promise<DecryptionResult>;
  /** Get public key for encryption */
  getPublicKey(): string;
  /** Reencrypt data for a specific user */
  reencrypt(
    handle: string,
    privateKey: string,
    publicKey: string,
    signature: string,
    contractAddress: string,
    userAddress: string
  ): Promise<bigint>;
}

/**
 * Contract interaction options
 */
export interface ContractOptions {
  /** Contract ABI */
  abi: any[];
  /** Contract address */
  address: string;
  /** Signer or provider */
  signerOrProvider: Signer | Provider;
}

/**
 * Encrypted transaction parameters
 */
export interface EncryptedTxParams {
  /** Function name to call */
  functionName: string;
  /** Function arguments (can include encrypted values) */
  args: any[];
  /** Transaction value in wei */
  value?: bigint;
  /** Gas limit */
  gasLimit?: bigint;
}

/**
 * Hook options for React integration
 */
export interface UseEncryptedInputOptions {
  /** Whether to encrypt immediately on mount */
  immediate?: boolean;
  /** Callback on encryption success */
  onSuccess?: (encrypted: EncryptedInput) => void;
  /** Callback on encryption error */
  onError?: (error: Error) => void;
}

/**
 * Hook result for encrypted input
 */
export interface UseEncryptedInputResult {
  /** Encrypted data */
  encrypted: EncryptedInput | null;
  /** Whether encryption is in progress */
  isEncrypting: boolean;
  /** Encryption error if any */
  error: Error | null;
  /** Function to trigger encryption */
  encrypt: (value: any) => Promise<void>;
  /** Reset the state */
  reset: () => void;
}

/**
 * Hook result for decryption
 */
export interface UseDecryptionResult {
  /** Decrypted value */
  decrypted: any;
  /** Whether decryption is in progress */
  isDecrypting: boolean;
  /** Decryption error if any */
  error: Error | null;
  /** Function to trigger decryption */
  decrypt: (request: DecryptionRequest) => Promise<void>;
  /** Reset the state */
  reset: () => void;
}

/**
 * Batch encryption input
 */
export interface BatchEncryptionInput {
  type: 'uint32' | 'uint64' | 'bool' | 'address';
  value: any;
}

/**
 * Batch encryption result
 */
export interface BatchEncryptionResult {
  encrypted: EncryptedInput[];
  inputProof: string;
}
