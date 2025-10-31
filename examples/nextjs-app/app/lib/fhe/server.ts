/**
 * Server-side FHE operations
 * Handles operations that should run on the server for security
 */

import { ethers } from 'ethers';

/**
 * Verify EIP-712 signature for decryption authorization
 */
export async function verifyDecryptionSignature(
  contractAddress: string,
  handle: string,
  userAddress: string,
  signature: string
): Promise<boolean> {
  try {
    // Define the EIP-712 domain
    const domain = {
      name: 'FHE Decryption',
      version: '1',
      chainId: 11155111, // Sepolia
      verifyingContract: contractAddress,
    };

    // Define the types
    const types = {
      Decrypt: [
        { name: 'handle', type: 'bytes32' },
        { name: 'timestamp', type: 'uint256' },
      ],
    };

    // Define the message
    const message = {
      handle,
      timestamp: Math.floor(Date.now() / 1000),
    };

    // Verify the signature
    const recoveredAddress = ethers.verifyTypedData(domain, types, message, signature);

    return recoveredAddress.toLowerCase() === userAddress.toLowerCase();
  } catch (error) {
    console.error('Signature verification failed:', error);
    return false;
  }
}

/**
 * Request decryption from the FHE gateway
 */
export async function requestDecryption(
  gatewayUrl: string,
  handle: string,
  contractAddress: string,
  signature: string
): Promise<any> {
  try {
    const response = await fetch(`${gatewayUrl}/decrypt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        handle,
        contractAddress,
        signature,
      }),
    });

    if (!response.ok) {
      throw new Error(`Gateway request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `Decryption request failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Validate encrypted handle format
 */
export function validateHandle(handle: string): boolean {
  // Handle should be a hex string
  const hexRegex = /^0x[a-fA-F0-9]+$/;
  return hexRegex.test(handle);
}

/**
 * Validate Ethereum address format
 */
export function validateAddress(address: string): boolean {
  const addressRegex = /^0x[a-fA-F0-9]{40}$/;
  return addressRegex.test(address);
}

/**
 * Process batch decryption requests
 */
export async function batchDecrypt(
  gatewayUrl: string,
  requests: Array<{
    handle: string;
    contractAddress: string;
    signature: string;
  }>
): Promise<any[]> {
  const results = await Promise.allSettled(
    requests.map((req) =>
      requestDecryption(gatewayUrl, req.handle, req.contractAddress, req.signature)
    )
  );

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return { success: true, data: result.value, index };
    } else {
      return {
        success: false,
        error: result.reason instanceof Error ? result.reason.message : 'Unknown error',
        index,
      };
    }
  });
}
