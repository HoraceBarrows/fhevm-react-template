/**
 * Validation Utilities
 * Input validation and data verification helpers
 */

import { FHEType } from '../fhe/types';

/**
 * Validate encryption type
 */
export function isValidFHEType(type: string): type is FHEType {
  const validTypes: FHEType[] = [
    'uint8', 'uint16', 'uint32', 'uint64', 'uint128', 'uint256', 'bool', 'address'
  ];
  return validTypes.includes(type as FHEType);
}

/**
 * Validate value for encryption type
 */
export function validateValueForType(value: any, type: FHEType): boolean {
  switch (type) {
    case 'bool':
      return typeof value === 'boolean';

    case 'address':
      return typeof value === 'string' && /^0x[a-fA-F0-9]{40}$/.test(value);

    case 'uint8':
      return isValidUint(value, 8);

    case 'uint16':
      return isValidUint(value, 16);

    case 'uint32':
      return isValidUint(value, 32);

    case 'uint64':
      return isValidUint(value, 64);

    case 'uint128':
      return isValidUint(value, 128);

    case 'uint256':
      return isValidUint(value, 256);

    default:
      return false;
  }
}

/**
 * Validate unsigned integer for specific bit size
 */
function isValidUint(value: any, bits: number): boolean {
  try {
    const num = typeof value === 'bigint' ? value : BigInt(value);
    return num >= 0n && num < 2n ** BigInt(bits);
  } catch {
    return false;
  }
}

/**
 * Validate encrypted handle format
 */
export function isValidHandle(handle: string): boolean {
  return /^0x[a-fA-F0-9]+$/.test(handle) && handle.length >= 10;
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validate chain ID
 */
export function isValidChainId(chainId: number): boolean {
  return Number.isInteger(chainId) && chainId > 0;
}

/**
 * Validate array of operands for computation
 */
export function validateOperands(operands: any[], minLength: number = 2): boolean {
  if (!Array.isArray(operands)) {
    return false;
  }

  if (operands.length < minLength) {
    return false;
  }

  return operands.every((op) => typeof op === 'string' && isValidHandle(op));
}

/**
 * Validate operation type
 */
export function isValidOperation(operation: string): boolean {
  const validOps = [
    'add', 'sub', 'mul', 'div',
    'eq', 'ne', 'lt', 'lte', 'gt', 'gte',
    'and', 'or', 'xor', 'not',
    'shl', 'shr'
  ];
  return validOps.includes(operation);
}

/**
 * Validate gas limit
 */
export function isValidGasLimit(gasLimit: bigint): boolean {
  const minGas = 21000n;
  const maxGas = 30000000n;
  return gasLimit >= minGas && gasLimit <= maxGas;
}

/**
 * Validate transaction value
 */
export function isValidTransactionValue(value: bigint): boolean {
  return value >= 0n;
}

/**
 * Sanitize and validate JSON input
 */
export function validateJSON(input: string): { valid: boolean; data?: any; error?: string } {
  try {
    const data = JSON.parse(input);
    return { valid: true, data };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Invalid JSON',
    };
  }
}

/**
 * Validate batch size for operations
 */
export function isValidBatchSize(size: number, maxSize: number = 100): boolean {
  return Number.isInteger(size) && size > 0 && size <= maxSize;
}

/**
 * Validate RPC URL format
 */
export function isValidRpcUrl(url: string): boolean {
  if (!isValidUrl(url)) {
    return false;
  }

  // Additional checks for RPC URLs
  const rpcPatterns = [
    /^https?:\/\/.*\.infura\.io/,
    /^https?:\/\/.*\.alchemy\.com/,
    /^https?:\/\/.*\.quicknode\.pro/,
    /^https?:\/\/localhost:\d+/,
    /^https?:\/\/127\.0\.0\.1:\d+/,
  ];

  return rpcPatterns.some((pattern) => pattern.test(url)) || url.includes('rpc');
}

/**
 * Validate configuration object
 */
export function validateConfig(config: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!config.chainId || !isValidChainId(config.chainId)) {
    errors.push('Invalid or missing chainId');
  }

  if (!config.rpcUrl || !isValidRpcUrl(config.rpcUrl)) {
    errors.push('Invalid or missing rpcUrl');
  }

  if (config.gatewayUrl && !isValidUrl(config.gatewayUrl)) {
    errors.push('Invalid gatewayUrl format');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
