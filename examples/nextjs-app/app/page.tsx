'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { EncryptionDemo } from './components/EncryptionDemo';
import { DecryptionDemo } from './components/DecryptionDemo';
import { ContractInteraction } from './components/ContractInteraction';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                FHEVM SDK Demo
              </h1>
              <p className="text-gray-600 mt-1">
                Universal SDK for Confidential dApps
              </p>
            </div>
            <ConnectButton />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🔒 Privacy-Preserving Smart Contracts
          </h2>
          <p className="text-gray-600 mb-4">
            This demo showcases the FHEVM SDK - a universal toolkit for building confidential
            dApps with Fully Homomorphic Encryption (FHE).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Framework Agnostic
              </h3>
              <p className="text-sm text-gray-600">
                Works with React, Vue, Next.js, and Node.js
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Simple API
              </h3>
              <p className="text-sm text-gray-600">
                Less than 10 lines to get started
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-3xl mb-2">🔐</div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Full Privacy
              </h3>
              <p className="text-sm text-gray-600">
                End-to-end encrypted computations
              </p>
            </div>
          </div>
        </div>

        {/* Demo Sections */}
        <div className="space-y-8">
          <EncryptionDemo />
          <DecryptionDemo />
          <ContractInteraction />
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Built with ❤️ using{' '}
            <a
              href="https://github.com/zama-ai/fhevm"
              className="text-blue-600 hover:text-blue-800 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Zama FHEVM
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
