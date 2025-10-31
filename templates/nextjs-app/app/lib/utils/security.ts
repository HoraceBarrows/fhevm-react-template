/**
 * Security Utilities
 * Helper functions for security operations and validation
 */

import { ethers } from 'ethers';

/**
 * Sanitize input to prevent injection attacks
 */
export function sanitizeInput(input: string): string {
  return input.replace(/[<>'"]/g, '');
}

/**
 * Validate Ethereum address
 */
export function isValidAddress(address: string): boolean {
  try {
    return ethers.isAddress(address);
  } catch {
    return false;
  }
}

/**
 * Validate hex string
 */
export function isValidHex(hex: string): boolean {
  return /^0x[a-fA-F0-9]+$/.test(hex);
}

/**
 * Validate signature format
 */
export function isValidSignature(signature: string): boolean {
  return /^0x[a-fA-F0-9]{130}$/.test(signature);
}

/**
 * Hash data for verification
 */
export function hashData(data: string): string {
  return ethers.keccak256(ethers.toUtf8Bytes(data));
}

/**
 * Generate random nonce
 */
export function generateNonce(): string {
  return ethers.hexlify(ethers.randomBytes(32));
}

/**
 * Validate timestamp is within acceptable range
 */
export function isValidTimestamp(timestamp: number, maxAge: number = 300000): boolean {
  const now = Date.now();
  const age = now - timestamp;
  return age >= 0 && age <= maxAge;
}

/**
 * Rate limiting check (simple in-memory implementation)
 */
const rateLimitMap = new Map<string, number[]>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(identifier) || [];

  // Remove old timestamps outside the window
  const validTimestamps = timestamps.filter((ts) => now - ts < windowMs);

  if (validTimestamps.length >= maxRequests) {
    return false;
  }

  validTimestamps.push(now);
  rateLimitMap.set(identifier, validTimestamps);

  return true;
}

/**
 * Verify EIP-712 typed data signature
 */
export function verifyTypedDataSignature(
  domain: any,
  types: any,
  message: any,
  signature: string,
  expectedSigner: string
): boolean {
  try {
    const recoveredAddress = ethers.verifyTypedData(domain, types, message, signature);
    return recoveredAddress.toLowerCase() === expectedSigner.toLowerCase();
  } catch {
    return false;
  }
}

/**
 * Encrypt sensitive data for storage (basic implementation)
 */
export function encryptForStorage(data: string, key: string): string {
  // In production, use proper encryption libraries
  const hash = ethers.keccak256(ethers.toUtf8Bytes(key));
  return ethers.keccak256(ethers.toUtf8Bytes(data + hash));
}

/**
 * Validate contract address is not zero address
 */
export function isNonZeroAddress(address: string): boolean {
  return isValidAddress(address) && address !== ethers.ZeroAddress;
}

/**
 * Check if value is within safe integer range
 */
export function isSafeInteger(value: number | bigint): boolean {
  const num = typeof value === 'bigint' ? Number(value) : value;
  return Number.isSafeInteger(num);
}

/**
 * Sanitize error messages to prevent information leakage
 */
export function sanitizeError(error: Error): string {
  const message = error.message.toLowerCase();

  // Remove sensitive information
  if (message.includes('private key') || message.includes('mnemonic')) {
    return 'Security error occurred';
  }

  if (message.includes('insufficient funds')) {
    return 'Insufficient funds for transaction';
  }

  return error.message;
}
