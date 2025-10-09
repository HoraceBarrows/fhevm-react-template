# @fhevm/sdk

Universal SDK for building confidential dApps with Fully Homomorphic Encryption (FHE).

## Features

- 🔒 **Privacy-First**: Built-in FHE encryption and decryption
- 🎯 **Framework Agnostic**: Works with React, Vue, Next.js, Node.js, and any JavaScript environment
- 🪝 **React Hooks**: wagmi-like API for React applications
- 📦 **Zero Config**: Minimal setup required (<10 lines to start)
- 🔌 **Modular**: Import only what you need
- 📚 **Type-Safe**: Full TypeScript support
- ⚡ **Lightweight**: Minimal bundle size

## Installation

```bash
npm install @fhevm/sdk ethers
# or
yarn add @fhevm/sdk ethers
# or
pnpm add @fhevm/sdk ethers
```

## Quick Start

### Basic Usage (Node.js / JavaScript)

```typescript
import { createFhevmInstance, encryptInput, decryptOutput } from '@fhevm/sdk';
import { ethers } from 'ethers';

// 1. Initialize
const provider = new ethers.JsonRpcProvider('YOUR_RPC_URL');
const client = await createFhevmInstance(
  {
    chainId: 11155111,
    rpcUrl: 'YOUR_RPC_URL',
    gatewayUrl: 'https://gateway.zama.ai'
  },
  provider
);

// 2. Encrypt data
const encrypted = await encryptInput(100, 'uint32');

// 3. Use in contract call
const contract = new ethers.Contract(address, abi, signer);
await contract.placeOrder(productId, encrypted.data);

// 4. Decrypt results
const decrypted = await decryptOutput({
  contractAddress: address,
  handle: '0x...',
  userAddress: await signer.getAddress()
});
```

### React Usage

```tsx
import { initializeFhevm, useEncryptedInput, useDecryption } from '@fhevm/sdk/react';
import { useEffect } from 'react';

// Initialize in your app root
function App() {
  useEffect(() => {
    initializeFhevm(
      {
        chainId: 11155111,
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL
      },
      provider
    );
  }, []);

  return <YourApp />;
}

// Use in components
function OrderForm() {
  const { encrypted, isEncrypting, encrypt } = useEncryptedInput('uint32');

  const handleSubmit = async (quantity: number) => {
    await encrypt(quantity);
    // Use encrypted.data for contract call
    await contract.placeOrder(productId, encrypted.data);
  };

  return (
    <form onSubmit={() => handleSubmit(10)}>
      <button disabled={isEncrypting}>
        {isEncrypting ? 'Encrypting...' : 'Place Order'}
      </button>
    </form>
  );
}

function OrderDetails({ orderId }) {
  const { decrypted, isDecrypting, decrypt } = useDecryption();

  const handleReveal = async () => {
    await decrypt({
      contractAddress: CONTRACT_ADDRESS,
      handle: orderHandle,
      userAddress: address
    });
  };

  return (
    <div>
      {isDecrypting ? 'Revealing...' : `Quantity: ${decrypted}`}
      <button onClick={handleReveal}>Reveal Order</button>
    </div>
  );
}
```

### Next.js Usage

```typescript
// app/providers.tsx
'use client';

import { useEffect } from 'react';
import { initializeFhevm } from '@fhevm/sdk';
import { useWalletClient } from 'wagmi';

export function FhevmProvider({ children }) {
  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    if (walletClient) {
      initializeFhevm(
        {
          chainId: 11155111,
          rpcUrl: process.env.NEXT_PUBLIC_RPC_URL!
        },
        walletClient
      );
    }
  }, [walletClient]);

  return <>{children}</>;
}

// app/layout.tsx
import { FhevmProvider } from './providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <WagmiProvider>
          <FhevmProvider>{children}</FhevmProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
```

## API Reference

### Core Functions

#### `createFhevmInstance(config, providerOrSigner)`

Create a new FHEVM client instance.

```typescript
const client = await createFhevmInstance(
  {
    chainId: 11155111,
    rpcUrl: 'https://sepolia.infura.io/v3/YOUR_KEY',
    aclAddress: '0x...', // Optional
    gatewayUrl: 'https://gateway.zama.ai' // Optional
  },
  provider
);
```

#### `encryptInput(value, type?)`

Encrypt a value for contract input.

```typescript
const encrypted = await encryptInput(100, 'uint32');
// Types: 'uint32' | 'uint64' | 'bool' | 'address'
```

#### `decryptOutput(params)`

Decrypt an encrypted output from contract.

```typescript
const decrypted = await decryptOutput({
  contractAddress: '0x...',
  handle: '0x...',
  userAddress: '0x...'
});
```

#### `encryptBatch(inputs)`

Encrypt multiple values efficiently.

```typescript
const { encrypted } = await encryptBatch([
  { type: 'uint32', value: 100 },
  { type: 'bool', value: true },
  { type: 'address', value: '0x...' }
]);
```

### React Hooks

#### `useFhevmInstance()`

Get the initialized FHEVM client.

```tsx
const client = useFhevmInstance();
```

#### `useEncryptedInput(type?, options?)`

Hook for encrypting input values.

```tsx
const { encrypted, isEncrypting, encrypt, reset } = useEncryptedInput('uint32', {
  onSuccess: (encrypted) => console.log('Encrypted!'),
  onError: (error) => console.error('Error:', error)
});
```

#### `useDecryption()`

Hook for decrypting output values.

```tsx
const { decrypted, isDecrypting, decrypt, reset } = useDecryption();
```

#### `useFhevmContract(options)`

Get a contract instance with encrypted support.

```tsx
const contract = useFhevmContract({
  address: '0x...',
  abi: contractABI,
  signerOrProvider: signer
});
```

#### `useEncryptedState(contract, functionName, args?, options?)`

Watch encrypted state changes with automatic polling.

```tsx
const stats = useEncryptedState(contract, 'productStats', [productId], {
  pollingInterval: 5000
});
```

### Utilities

```typescript
import {
  formatHandle,
  formatEther,
  parseEther,
  isValidAddress,
  formatCategory,
  formatOrderStatus,
  getTimeRemaining
} from '@fhevm/sdk';

formatHandle('0x1234...7890'); // "0x1234...7890"
formatEther(BigInt('1000000000000000000')); // "1.0000"
isValidAddress('0x...'); // true/false
```

## Configuration

```typescript
interface FhevmConfig {
  chainId: number; // Network chain ID
  rpcUrl: string; // RPC endpoint
  aclAddress?: string; // Access Control List contract
  gatewayUrl?: string; // Gateway for decryption
  publicKey?: string; // Public key for encryption
}
```

## Examples

See the `examples/` directory for complete examples:

- **nextjs-app**: Next.js 14 with App Router
- **sports-group-buying**: Anonymous sports group buying platform

## Best Practices

1. **Initialize Once**: Call `initializeFhevm()` once at app startup
2. **Error Handling**: Always wrap encryption/decryption in try-catch
3. **Loading States**: Use `isEncrypting` and `isDecrypting` for UX
4. **Type Safety**: Specify encryption types explicitly when possible
5. **Batch Operations**: Use `encryptBatch()` for multiple values

## Troubleshooting

### "FHEVM client not initialized"

Make sure to call `initializeFhevm()` before using any hooks or functions.

### Encryption fails

Verify your network configuration and ensure the provider is connected.

### Decryption returns null

Check that the user has permission to decrypt the value and the handle is correct.

## License

MIT

## Resources

- [Zama Documentation](https://docs.zama.ai)
- [FHEVM Whitepaper](https://github.com/zama-ai/fhevm)
- [Examples](../../examples)
