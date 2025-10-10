'use client';

import { useState } from 'react';
import { useEncryptedInput } from '@fhevm/sdk/react';
import { useAccount } from 'wagmi';

export function EncryptionDemo() {
  const { isConnected } = useAccount();
  const [inputValue, setInputValue] = useState('');
  const [encType, setEncType] = useState<'uint32' | 'uint64' | 'bool' | 'address'>('uint32');

  const { encrypted, isEncrypting, error, encrypt, reset } = useEncryptedInput(encType);

  const handleEncrypt = async () => {
    if (!inputValue) return;

    let value: any = inputValue;
    if (encType === 'uint32' || encType === 'uint64') {
      value = Number(inputValue);
    } else if (encType === 'bool') {
      value = inputValue.toLowerCase() === 'true';
    }

    await encrypt(value);
  };

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          🔐 Encryption Demo
        </h2>
        <p className="text-gray-600">
          Please connect your wallet to try encryption.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        🔐 Encryption Demo
      </h2>
      <p className="text-gray-600 mb-6">
        Encrypt data using FHE before sending it to the blockchain.
      </p>

      <div className="space-y-4">
        {/* Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data Type
          </label>
          <select
            value={encType}
            onChange={(e) => {
              setEncType(e.target.value as any);
              reset();
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="uint32">uint32 (32-bit integer)</option>
            <option value="uint64">uint64 (64-bit integer)</option>
            <option value="bool">bool (true/false)</option>
            <option value="address">address (Ethereum address)</option>
          </select>
        </div>

        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Value to Encrypt
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={
              encType === 'bool'
                ? 'true or false'
                : encType === 'address'
                ? '0x...'
                : 'Enter a number'
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Encrypt Button */}
        <button
          onClick={handleEncrypt}
          disabled={!inputValue || isEncrypting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isEncrypting ? 'Encrypting...' : 'Encrypt'}
        </button>

        {/* Results */}
        {encrypted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-green-900 mb-2">
              ✅ Encrypted Successfully
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Data:</span>
                <code className="ml-2 bg-white px-2 py-1 rounded text-xs">
                  {encrypted.data.length} bytes
                </code>
              </div>
              <div>
                <span className="font-medium text-gray-700">Proof:</span>
                <code className="ml-2 bg-white px-2 py-1 rounded text-xs break-all">
                  {encrypted.inputProof.slice(0, 20)}...
                </code>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-red-900 mb-2">
              ❌ Encryption Failed
            </h3>
            <p className="text-sm text-red-700">{error.message}</p>
          </div>
        )}
      </div>

      {/* Code Example */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          📝 Code Example
        </h3>
        <pre className="text-xs text-gray-700 overflow-x-auto">
{`const { encrypted, encrypt } = useEncryptedInput('${encType}');
await encrypt(${inputValue || 'value'});
// Use encrypted.data in contract call`}
        </pre>
      </div>
    </div>
  );
}
