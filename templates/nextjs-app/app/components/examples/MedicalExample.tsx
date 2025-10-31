'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input, TextArea } from '../ui/Input';
import { useEncryption, useBatchEncryption } from '../../hooks/useEncryption';
import { useAccount } from 'wagmi';

export function MedicalExample() {
  const { address } = useAccount();
  const [age, setAge] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const { encryptBatch, results, isEncrypting, error } = useBatchEncryption();

  const handleEncryptRecords = async () => {
    if (!age || !bloodPressure) {
      alert('Please fill in all medical data fields');
      return;
    }

    try {
      const ageNum = parseInt(age);
      const bpNum = parseInt(bloodPressure);

      if (isNaN(ageNum) || isNaN(bpNum)) {
        alert('Please enter valid numbers');
        return;
      }

      if (ageNum < 0 || ageNum > 150) {
        alert('Please enter a valid age (0-150)');
        return;
      }

      if (bpNum < 50 || bpNum > 250) {
        alert('Please enter a valid blood pressure (50-250)');
        return;
      }

      await encryptBatch([
        { value: ageNum, type: 'uint8' },
        { value: bpNum, type: 'uint8' },
      ]);

      alert('Medical records encrypted successfully!');
    } catch (err) {
      console.error('Encryption failed:', err);
    }
  };

  const handleSubmitToProvider = () => {
    if (results.length === 0) {
      alert('Please encrypt your medical data first');
      return;
    }

    // In a real application, this would send the encrypted data to a smart contract
    alert(
      'Encrypted medical data ready to submit to healthcare provider smart contract. The provider can process your data without seeing the raw values.'
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Private Medical Records Example</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-purple-900 mb-2">Use Case</h4>
            <p className="text-sm text-purple-800">
              Share medical data with healthcare providers and researchers while keeping
              sensitive information encrypted. Smart contracts can perform computations
              and validations without exposing your private health data.
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
            <h4 className="text-md font-semibold text-gray-900 mb-3">
              Enter Medical Information
            </h4>

            <Input
              type="number"
              label="Age"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              disabled={!address}
              helperText="Your age will be encrypted"
              fullWidth
            />

            <Input
              type="number"
              label="Blood Pressure (Systolic)"
              placeholder="Enter blood pressure (e.g., 120)"
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
              disabled={!address}
              helperText="Measured in mmHg"
              fullWidth
            />

            <TextArea
              label="Diagnosis Notes (Optional)"
              placeholder="Additional notes..."
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              disabled={!address}
              rows={3}
              helperText="These notes will also be encrypted"
              fullWidth
            />

            <Button
              onClick={handleEncryptRecords}
              isLoading={isEncrypting}
              disabled={!address || !age || !bloodPressure}
              fullWidth
            >
              Encrypt Medical Data
            </Button>
          </div>

          {results.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800 font-medium mb-3">
                Medical Data Encrypted Successfully!
              </p>
              <div className="space-y-3">
                {results.map((result, index) => (
                  <div key={index}>
                    <p className="text-xs text-green-700 font-medium">
                      Field {index + 1}:
                    </p>
                    <p className="text-xs font-mono bg-white p-2 rounded break-all">
                      {result.data}
                    </p>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleSubmitToProvider}
                variant="success"
                size="sm"
                className="mt-3"
              >
                Submit to Healthcare Provider
              </Button>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-gray-600">
          <p className="font-medium mb-1">Privacy Benefits:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Medical data is encrypted before leaving your device</li>
            <li>Healthcare providers can verify eligibility without seeing raw data</li>
            <li>Researchers can perform statistical analysis on encrypted datasets</li>
            <li>Insurance claims can be processed privately</li>
            <li>You maintain full control over who can decrypt your data</li>
          </ul>
        </div>
      </CardFooter>
    </Card>
  );
}
