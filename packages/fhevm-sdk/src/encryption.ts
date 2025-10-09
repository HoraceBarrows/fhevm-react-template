/**
 * Encryption utilities for FHEVM SDK
 */

import { getFhevmClient } from './init';
import type {
  EncryptedInput,
  BatchEncryptionInput,
  BatchEncryptionResult
} from './types';

/**
 * Encrypt a single input value
 * Automatically determines encryption type based on value
 *
 * @example
 * ```typescript
 * const encrypted = await encryptInput(100);
 * const encryptedBool = await encryptInput(true);
 * ```
 */
export async function encryptInput(
  value: number | bigint | boolean | string,
  type?: 'uint32' | 'uint64' | 'bool' | 'address'
): Promise<EncryptedInput> {
  const client = getFhevmClient();

  // Auto-detect type if not specified
  if (!type) {
    if (typeof value === 'boolean') {
      type = 'bool';
    } else if (typeof value === 'string' && value.startsWith('0x')) {
      type = 'address';
    } else if (typeof value === 'bigint' || value > 2 ** 32 - 1) {
      type = 'uint64';
    } else {
      type = 'uint32';
    }
  }

  switch (type) {
    case 'uint32':
      return client.encrypt32(Number(value));
    case 'uint64':
      return client.encrypt64(BigInt(value));
    case 'bool':
      return client.encryptBool(Boolean(value));
    case 'address':
      return client.encryptAddress(String(value));
    default:
      throw new Error(`Unsupported encryption type: ${type}`);
  }
}

/**
 * Encrypt multiple inputs in batch
 * More efficient than encrypting one by one
 *
 * @example
 * ```typescript
 * const encrypted = await encryptBatch([
 *   { type: 'uint32', value: 100 },
 *   { type: 'bool', value: true },
 *   { type: 'address', value: '0x...' }
 * ]);
 * ```
 */
export async function encryptBatch(
  inputs: BatchEncryptionInput[]
): Promise<BatchEncryptionResult> {
  const client = getFhevmClient();

  const encrypted = await Promise.all(
    inputs.map((input) => encryptInput(input.value, input.type))
  );

  // Combine all input proofs (in real implementation)
  const inputProof = encrypted[0]?.inputProof || '0x';

  return {
    encrypted,
    inputProof
  };
}

/**
 * Decrypt an output value from a contract
 * Uses EIP-712 signature for user decryption
 *
 * @example
 * ```typescript
 * const decrypted = await decryptOutput({
 *   contractAddress: '0x...',
 *   handle: '0x...',
 *   userAddress: '0x...'
 * });
 * ```
 */
export async function decryptOutput(params: {
  contractAddress: string;
  handle: string;
  userAddress: string;
}): Promise<any> {
  const client = getFhevmClient();

  const result = await client.decrypt({
    contractAddress: params.contractAddress,
    handle: params.handle,
    userAddress: params.userAddress
  });

  if (!result.success) {
    throw new Error('Decryption failed');
  }

  return result.value;
}

/**
 * Encrypt a value for use in contract function call
 * Returns the encrypted data formatted for Solidity
 *
 * @example
 * ```typescript
 * const encryptedParam = await encryptForContract(quantity, 'uint32');
 * await contract.placeOrder(productId, encryptedParam);
 * ```
 */
export async function encryptForContract(
  value: any,
  type: 'uint32' | 'uint64' | 'bool' | 'address'
): Promise<{ data: string; proof: string }> {
  const encrypted = await encryptInput(value, type);

  return {
    data: '0x' + Buffer.from(encrypted.data).toString('hex'),
    proof: encrypted.inputProof
  };
}

/**
 * Utility to check if a value needs encryption
 */
export function needsEncryption(value: any): boolean {
  // Check if value is already encrypted
  if (typeof value === 'object' && 'data' in value && 'inputProof' in value) {
    return false;
  }
  return true;
}
