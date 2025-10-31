/**
 * FHE Type Definitions
 * TypeScript types and interfaces for FHE operations
 */

// Encryption types supported by FHEVM
export type FHEType = 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256' | 'bool' | 'address';

// Encrypted data structure
export interface EncryptedData {
  data: string;
  type: FHEType;
  timestamp?: number;
}

// Decryption request parameters
export interface DecryptionParams {
  handle: string;
  contractAddress: string;
  userAddress: string;
  signature?: string;
}

// Decryption result
export interface DecryptionResult {
  value: string | number | boolean;
  type: FHEType;
  timestamp?: number;
}

// FHE client configuration
export interface FHEConfig {
  chainId: number;
  rpcUrl: string;
  gatewayUrl?: string;
  networkName?: string;
}

// Key pair information
export interface KeyInfo {
  address: string;
  publicKey: string;
  algorithm: string;
  created: number;
}

// Computation operation types
export type ComputationOp =
  | 'add' | 'sub' | 'mul' | 'div'
  | 'eq' | 'ne' | 'lt' | 'lte' | 'gt' | 'gte'
  | 'and' | 'or' | 'xor' | 'not'
  | 'shl' | 'shr';

// Computation request
export interface ComputationRequest {
  operation: ComputationOp;
  operands: string[];
  type: FHEType;
}

// Computation result
export interface ComputationResult {
  handle: string;
  operation: ComputationOp;
  type: FHEType;
  timestamp: number;
}

// Error types
export interface FHEError {
  code: string;
  message: string;
  details?: any;
}

// Transaction parameters with encrypted data
export interface FHETransactionParams {
  to: string;
  data: string;
  value?: bigint;
  gasLimit?: bigint;
  encrypted?: EncryptedData[];
}

// EIP-712 domain for signatures
export interface EIP712Domain {
  name: string;
  version: string;
  chainId: number;
  verifyingContract: string;
}

// EIP-712 typed data for decryption
export interface DecryptionTypedData {
  domain: EIP712Domain;
  types: {
    Decrypt: Array<{ name: string; type: string }>;
  };
  message: {
    handle: string;
    timestamp: number;
  };
}

// Contract interaction result
export interface ContractResult {
  transactionHash?: string;
  blockNumber?: number;
  encryptedOutput?: string;
  decryptedOutput?: any;
  gasUsed?: bigint;
}

// Batch operation result
export interface BatchResult<T> {
  success: boolean;
  results: T[];
  errors: Array<{ index: number; error: string }>;
}
