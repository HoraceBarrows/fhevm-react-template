'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useComputation } from '../../hooks/useComputation';

export function ComputationDemo() {
  const [handle1, setHandle1] = useState('');
  const [handle2, setHandle2] = useState('');
  const [operation, setOperation] = useState<'add' | 'mul' | 'gt'>('add');

  const { compute, result, isComputing, error } = useComputation();

  const handleCompute = async () => {
    if (!handle1 || !handle2) {
      alert('Please enter both encrypted handles');
      return;
    }

    try {
      await compute(operation, [handle1, handle2]);
    } catch (err) {
      console.error('Computation failed:', err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Homomorphic Computation Demo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-600">
            Perform computations on encrypted data without decryption
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Encrypted Handle 1"
              placeholder="0x..."
              value={handle1}
              onChange={(e) => setHandle1(e.target.value)}
              fullWidth
            />

            <Input
              label="Encrypted Handle 2"
              placeholder="0x..."
              value={handle2}
              onChange={(e) => setHandle2(e.target.value)}
              fullWidth
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Operation
            </label>
            <div className="flex gap-2">
              <Button
                variant={operation === 'add' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setOperation('add')}
              >
                Add (+)
              </Button>
              <Button
                variant={operation === 'mul' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setOperation('mul')}
              >
                Multiply (×)
              </Button>
              <Button
                variant={operation === 'gt' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setOperation('gt')}
              >
                Greater Than (&gt;)
              </Button>
            </div>
          </div>

          <Button
            onClick={handleCompute}
            isLoading={isComputing}
            disabled={!handle1 || !handle2}
            fullWidth
          >
            Compute
          </Button>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <p className="text-sm text-red-600 font-medium">Error</p>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          )}

          {result && (
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <p className="text-sm text-green-800 font-medium mb-2">
                Computation Successful
              </p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-green-700">Result Handle:</p>
                  <p className="text-sm font-mono bg-white p-2 rounded break-all">
                    {result.handle}
                  </p>
                </div>
                <p className="text-xs text-green-700">
                  Operation: {result.operation} | Type: {result.type}
                </p>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> The computation result is also encrypted. Use the
              decryption demo to decrypt the result handle.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
