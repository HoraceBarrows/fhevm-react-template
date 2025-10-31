'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useEncryption } from '../../hooks/useEncryption';
import { useAccount } from 'wagmi';

export function BankingExample() {
  const { address } = useAccount();
  const [balance, setBalance] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const { encrypt, encrypted, isEncrypting, error } = useEncryption({ type: 'uint64' });

  const handleEncryptBalance = async () => {
    if (!balance) {
      alert('Please enter a balance amount');
      return;
    }

    try {
      const amount = parseInt(balance);
      if (isNaN(amount) || amount < 0) {
        alert('Please enter a valid positive number');
        return;
      }

      await encrypt(amount);
    } catch (err) {
      console.error('Encryption failed:', err);
    }
  };

  const handleTransfer = async () => {
    if (!transferAmount) {
      alert('Please enter a transfer amount');
      return;
    }

    try {
      const amount = parseInt(transferAmount);
      if (isNaN(amount) || amount < 0) {
        alert('Please enter a valid positive number');
        return;
      }

      await encrypt(amount);
      // In a real application, this would send a transaction to the blockchain
      alert('Transfer encrypted successfully! Ready to send to smart contract.');
    } catch (err) {
      console.error('Transfer encryption failed:', err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Private Banking Example</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Use Case</h4>
            <p className="text-sm text-blue-800">
              Keep your bank balance private while still allowing the smart contract to
              verify you have sufficient funds for transfers. Your balance remains encrypted
              end-to-end.
            </p>
          </div>

          {!address && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                Please connect your wallet to use this feature
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-3">
                1. Encrypt Your Balance
              </h4>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Enter balance (e.g., 1000)"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  disabled={!address}
                  fullWidth
                />
                <Button
                  onClick={handleEncryptBalance}
                  isLoading={isEncrypting}
                  disabled={!address || !balance}
                >
                  Encrypt
                </Button>
              </div>
            </div>

            {encrypted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800 font-medium mb-2">
                  Balance Encrypted!
                </p>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-green-700">Encrypted Data:</p>
                    <p className="text-xs font-mono bg-white p-2 rounded break-all">
                      {encrypted.data}
                    </p>
                  </div>
                  <p className="text-xs text-green-700">
                    Type: {encrypted.type}
                  </p>
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <h4 className="text-md font-semibold text-gray-900 mb-3">
                2. Make Private Transfer
              </h4>
              <div className="space-y-3">
                <Input
                  type="number"
                  placeholder="Transfer amount (e.g., 100)"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  disabled={!address}
                  fullWidth
                />
                <Button
                  onClick={handleTransfer}
                  isLoading={isEncrypting}
                  disabled={!address || !transferAmount}
                  variant="success"
                  fullWidth
                >
                  Encrypt & Prepare Transfer
                </Button>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-gray-600">
          <p className="font-medium mb-1">How it works:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Your balance is encrypted on the client side</li>
            <li>Smart contracts can verify sufficient funds without seeing the amount</li>
            <li>Transfer amounts remain private to other users</li>
            <li>Only you can decrypt and view your actual balance</li>
          </ul>
        </div>
      </CardFooter>
    </Card>
  );
}
