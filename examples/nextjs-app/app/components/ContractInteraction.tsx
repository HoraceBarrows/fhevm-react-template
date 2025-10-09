'use client';

import { useState } from 'react';
import { useFhevmContract, useEncryptedInput } from '@fhevm/sdk/react';
import { useAccount, useWalletClient } from 'wagmi';

// Example ABI (simplified)
const EXAMPLE_ABI = [
  'function placeOrder(uint256 productId, uint32 quantity) external payable',
  'function getProductInfo(uint256 productId) external view returns (string memory name, uint256 price)',
];

export function ContractInteraction() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [contractAddress, setContractAddress] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [txStatus, setTxStatus] = useState<'idle' | 'encrypting' | 'sending' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { encrypted, isEncrypting, encrypt } = useEncryptedInput('uint32');

  const handlePlaceOrder = async () => {
    if (!quantity || !productId || !contractAddress || !walletClient) return;

    try {
      // Step 1: Encrypt quantity
      setTxStatus('encrypting');
      await encrypt(Number(quantity));

      // Step 2: Send transaction
      setTxStatus('sending');

      // In real implementation:
      // const contract = useFhevmContract({ address: contractAddress, abi: EXAMPLE_ABI, signerOrProvider: walletClient });
      // const tx = await contract.placeOrder(productId, encrypted.data, { value: ethers.parseEther('0.01') });
      // const receipt = await tx.wait();

      // Mock success
      setTxHash('0x' + Math.random().toString(16).substring(2, 66));
      setTxStatus('success');
    } catch (error: any) {
      setErrorMsg(error.message || 'Transaction failed');
      setTxStatus('error');
    }
  };

  const reset = () => {
    setTxStatus('idle');
    setTxHash('');
    setErrorMsg('');
  };

  if (!isConnected) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          📝 Contract Interaction
        </h2>
        <p className="text-gray-600">
          Please connect your wallet to interact with contracts.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        📝 Contract Interaction
      </h2>
      <p className="text-gray-600 mb-6">
        Place an order with encrypted quantity using the FHEVM SDK.
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

        {/* Product ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product ID
          </label>
          <input
            type="number"
            value={productId}
            onChange={(e) => {
              setProductId(e.target.value);
              reset();
            }}
            placeholder="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Quantity (will be encrypted) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity (Encrypted) 🔐
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              reset();
            }}
            placeholder="10"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            This value will be encrypted before sending to the blockchain
          </p>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          disabled={!contractAddress || !productId || !quantity || txStatus === 'encrypting' || txStatus === 'sending'}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {txStatus === 'encrypting' && '🔐 Encrypting...'}
          {txStatus === 'sending' && '📤 Sending Transaction...'}
          {txStatus === 'idle' && '🛒 Place Order'}
          {txStatus === 'success' && '✅ Order Placed!'}
          {txStatus === 'error' && '❌ Try Again'}
        </button>

        {/* Transaction Status */}
        {txStatus === 'success' && txHash && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-green-900 mb-2">
              ✅ Transaction Successful
            </h3>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-gray-700 text-sm">Tx Hash:</span>
                <code className="ml-2 bg-white px-2 py-1 rounded text-xs break-all">
                  {txHash}
                </code>
              </div>
              <a
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-green-700 hover:text-green-900 underline"
              >
                View on Etherscan →
              </a>
            </div>
          </div>
        )}

        {txStatus === 'error' && errorMsg && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-red-900 mb-2">
              ❌ Transaction Failed
            </h3>
            <p className="text-sm text-red-700">{errorMsg}</p>
          </div>
        )}
      </div>

      {/* Flow Diagram */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          🔄 Transaction Flow
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              txStatus !== 'idle' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              1
            </div>
            <span className="ml-3 text-gray-700">Encrypt quantity using FHE</span>
          </div>
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              txStatus === 'sending' || txStatus === 'success' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              2
            </div>
            <span className="ml-3 text-gray-700">Submit encrypted data to contract</span>
          </div>
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              txStatus === 'success' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              3
            </div>
            <span className="ml-3 text-gray-700">Contract processes encrypted order</span>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          📝 Code Example
        </h3>
        <pre className="text-xs text-gray-700 overflow-x-auto">
{`const { encrypt } = useEncryptedInput('uint32');
const contract = useFhevmContract({ address, abi });

// Encrypt and send
const encrypted = await encrypt(quantity);
const tx = await contract.placeOrder(
  productId,
  encrypted.data,
  { value: parseEther('0.01') }
);
await tx.wait();`}
        </pre>
      </div>
    </div>
  );
}
