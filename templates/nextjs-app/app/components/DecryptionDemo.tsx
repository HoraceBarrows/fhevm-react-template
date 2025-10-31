'use client';

import { useState } from 'react';
import { useDecryption } from '@fhevm/sdk/react';
import { useAccount } from 'wagmi';

export function DecryptionDemo() {
  const { address, isConnected } = useAccount();
  const [contractAddress, setContractAddress] = useState('');
  const [handle, setHandle] = useState('');

  const { decrypted, isDecrypting, error, decrypt, reset } = useDecryption();

  const handleDecrypt = async () => {
    if (!contractAddress || !handle || !address) return;

    await decrypt({
      contractAddress,
      handle,
      userAddress: address,
    });
  };

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          🔓 Decryption Demo
        </h2>
        <p className="text-gray-600">
          Please connect your wallet to try decryption.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        🔓 Decryption Demo
      </h2>
      <p className="text-gray-600 mb-6">
        Decrypt your encrypted data using EIP-712 signatures.
      </p>

      <div className="space-y-4">
        {/* Contract Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contract Address
          </label>
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => {
              setContractAddress(e.target.value);
              reset();
            }}
            placeholder="0x..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Handle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Encrypted Handle
          </label>
          <input
            type="text"
            value={handle}
            onChange={(e) => {
              setHandle(e.target.value);
              reset();
            }}
            placeholder="0x..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* User Address (read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Address
          </label>
          <input
            type="text"
            value={address || ''}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
          />
        </div>

        {/* Decrypt Button */}
        <button
          onClick={handleDecrypt}
          disabled={!contractAddress || !handle || isDecrypting}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isDecrypting ? 'Decrypting...' : 'Decrypt'}
        </button>

        {/* Results */}
        {decrypted !== null && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-green-900 mb-2">
              ✅ Decrypted Successfully
            </h3>
            <div className="bg-white rounded p-3">
              <span className="font-medium text-gray-700">Value:</span>
              <code className="ml-2 text-lg font-mono text-green-700">
                {String(decrypted)}
              </code>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-red-900 mb-2">
              ❌ Decryption Failed
            </h3>
            <p className="text-sm text-red-700">{error.message}</p>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">
          ℹ️ How it works
        </h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Enter the contract address containing encrypted data</li>
          <li>Provide the handle of the encrypted value</li>
          <li>Sign an EIP-712 message to prove ownership</li>
          <li>Decrypt and reveal your private data</li>
        </ul>
      </div>

      {/* Code Example */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          📝 Code Example
        </h3>
        <pre className="text-xs text-gray-700 overflow-x-auto">
{`const { decrypted, decrypt } = useDecryption();
await decrypt({
  contractAddress: '0x...',
  handle: '0x...',
  userAddress: address
});
// decrypted contains the revealed value`}
        </pre>
      </div>
    </div>
  );
}
