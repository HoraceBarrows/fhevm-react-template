'use client';

import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { getPublicKey, rotateKeys, hasKeys } from '../../lib/fhe/keys';

export function KeyManager() {
  const { address } = useAccount();
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [keysExist, setKeysExist] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      checkKeys();
    }
  }, [address]);

  const checkKeys = async () => {
    if (!address) return;

    setIsLoading(true);
    setError(null);

    try {
      const exists = hasKeys(address);
      setKeysExist(exists);

      if (exists) {
        const key = await getPublicKey(address);
        setPublicKey(key);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check keys');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateKeys = async () => {
    if (!address) return;

    setIsLoading(true);
    setError(null);

    try {
      const key = await getPublicKey(address);
      setPublicKey(key);
      setKeysExist(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate keys');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRotateKeys = async () => {
    if (!address) return;

    setIsLoading(true);
    setError(null);

    try {
      const keyPair = await rotateKeys(address);
      setPublicKey(keyPair.publicKey);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to rotate keys');
    } finally {
      setIsLoading(false);
    }
  };

  if (!address) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Key Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Connect your wallet to manage FHE keys</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>FHE Key Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Connected Address:</p>
            <p className="text-sm font-mono bg-gray-100 p-2 rounded break-all">
              {address}
            </p>
          </div>

          {publicKey && (
            <div>
              <p className="text-sm text-gray-600 mb-2">Public Key:</p>
              <p className="text-sm font-mono bg-gray-100 p-2 rounded break-all">
                {publicKey}
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="flex gap-2">
            {!keysExist ? (
              <Button
                onClick={handleGenerateKeys}
                isLoading={isLoading}
                variant="primary"
              >
                Generate Keys
              </Button>
            ) : (
              <>
                <Button
                  onClick={checkKeys}
                  isLoading={isLoading}
                  variant="secondary"
                >
                  Refresh
                </Button>
                <Button
                  onClick={handleRotateKeys}
                  isLoading={isLoading}
                  variant="primary"
                >
                  Rotate Keys
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
