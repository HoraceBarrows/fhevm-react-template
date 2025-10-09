/**
 * FHEVM SDK - Universal SDK for Fully Homomorphic Encryption
 *
 * Framework-agnostic SDK for building confidential dApps with FHE.
 * Works with React, Vue, Next.js, Node.js, and any JavaScript environment.
 *
 * @packageDocumentation
 */

export { FhevmClient } from './client';
export { createFhevmInstance, initializeFhevm } from './init';
export { encryptInput, decryptOutput, encryptBatch } from './encryption';
export {
  useEncryptedInput,
  useDecryption,
  useFhevmContract,
  useFhevmInstance
} from './react';
export * from './types';
export * from './utils';

/**
 * Default export for convenience
 */
export { FhevmClient as default } from './client';
