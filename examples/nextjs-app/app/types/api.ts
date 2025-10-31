/**
 * API-related TypeScript type definitions
 * Types for API requests and responses
 */

import { FHEDataType } from './fhe';

// Base API response
export interface APIResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  timestamp?: number;
}

// Encryption API types
export interface EncryptRequest {
  value: number | bigint | boolean | string;
  type?: FHEDataType;
}

export interface EncryptResponse {
  encrypted: {
    data: string;
    type: FHEDataType;
    timestamp: number;
  };
}

// Decryption API types
export interface DecryptRequest {
  handle: string;
  contractAddress: string;
  userAddress: string;
  signature?: string;
}

export interface DecryptResponse {
  decrypted: {
    value: string | number | boolean;
    type: FHEDataType;
    timestamp: number;
  };
}

// Computation API types
export type ComputationOperation =
  | 'add' | 'sub' | 'mul' | 'div'
  | 'eq' | 'ne' | 'lt' | 'lte' | 'gt' | 'gte'
  | 'and' | 'or' | 'xor' | 'not'
  | 'shl' | 'shr';

export interface ComputeRequest {
  operation: ComputationOperation;
  operands: string[];
  type?: FHEDataType;
}

export interface ComputeResponse {
  result: {
    handle: string;
    operation: ComputationOperation;
    type: FHEDataType;
    timestamp: number;
  };
}

// Key management API types
export interface KeyRequest {
  address: string;
  action?: 'generate' | 'rotate' | 'retrieve';
}

export interface KeyResponse {
  key?: {
    address: string;
    publicKey: string;
    algorithm: string;
    created: number;
  };
  keys?: {
    address: string;
    publicKey: string;
    algorithm: string;
    created: number;
  };
  newPublicKey?: string;
}

// Batch operations
export interface BatchEncryptRequest {
  values: Array<{
    value: any;
    type: FHEDataType;
  }>;
}

export interface BatchDecryptRequest {
  requests: Array<{
    handle: string;
    contractAddress: string;
    signature?: string;
  }>;
}

export interface BatchOperationResponse<T> {
  success: boolean;
  results: T[];
  errors: Array<{
    index: number;
    error: string;
  }>;
}

// Error response
export interface APIError {
  error: string;
  code?: string;
  details?: any;
  timestamp: number;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Status endpoints
export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: number;
  services: {
    fhevm: boolean;
    gateway: boolean;
    rpc: boolean;
  };
}

export interface EndpointInfo {
  endpoint: string;
  method: string;
  description: string;
  parameters: Record<string, string>;
  examples?: Record<string, any>;
}
