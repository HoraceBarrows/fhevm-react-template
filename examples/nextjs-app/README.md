# Next.js FHEVM SDK Example

Complete Next.js 14 application demonstrating the FHEVM SDK.

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript with full type safety
- ✅ Tailwind CSS for styling
- ✅ RainbowKit wallet connection
- ✅ FHEVM SDK integration
- ✅ Complete API routes for FHE operations
- ✅ Custom React hooks for FHE
- ✅ Encryption/Decryption interactive demos
- ✅ Homomorphic computation examples
- ✅ Key management interface
- ✅ Real-world use case examples (Banking, Medical)
- ✅ Reusable UI component library
- ✅ Contract interaction examples

## Getting Started

### 1. Install Dependencies

```bash
# From root directory
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:

```
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
NEXT_PUBLIC_WALLET_CONNECT_ID=your_project_id
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
nextjs-app/
├── app/
│   ├── api/                        # API Routes
│   │   ├── fhe/                    # FHE operations
│   │   │   ├── route.ts            # Main FHE endpoint
│   │   │   ├── encrypt/route.ts    # Encryption endpoint
│   │   │   ├── decrypt/route.ts    # Decryption endpoint
│   │   │   └── compute/route.ts    # Computation endpoint
│   │   └── keys/route.ts           # Key management endpoint
│   │
│   ├── components/
│   │   ├── ui/                     # Base UI components
│   │   │   ├── Button.tsx          # Button component
│   │   │   ├── Input.tsx           # Input component
│   │   │   └── Card.tsx            # Card component
│   │   ├── fhe/                    # FHE components
│   │   │   ├── FHEProvider.tsx     # FHE context provider
│   │   │   ├── EncryptionDemo.tsx  # Encryption demo
│   │   │   ├── DecryptionDemo.tsx  # Decryption demo
│   │   │   ├── ComputationDemo.tsx # Computation demo
│   │   │   ├── KeyManager.tsx      # Key management UI
│   │   │   └── ContractInteraction.tsx # Contract interaction
│   │   └── examples/               # Use case examples
│   │       ├── BankingExample.tsx  # Banking use case
│   │       └── MedicalExample.tsx  # Medical records use case
│   │
│   ├── hooks/                      # Custom React hooks
│   │   ├── useFHE.ts               # FHE operations hook
│   │   ├── useEncryption.ts        # Encryption hook
│   │   └── useComputation.ts       # Computation hook
│   │
│   ├── lib/                        # Libraries
│   │   ├── fhe/                    # FHE utilities
│   │   │   ├── client.ts           # Client-side FHE
│   │   │   ├── server.ts           # Server-side FHE
│   │   │   ├── keys.ts             # Key management
│   │   │   └── types.ts            # FHE types
│   │   └── utils/                  # Utility functions
│   │       ├── security.ts         # Security utils
│   │       └── validation.ts       # Validation utils
│   │
│   ├── types/                      # TypeScript definitions
│   │   ├── fhe.ts                  # FHE types
│   │   └── api.ts                  # API types
│   │
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Home page
│   ├── providers.tsx               # App providers
│   └── globals.css                 # Global styles
│
├── public/                         # Static files
├── .env.example                    # Environment template
├── next.config.js                  # Next.js config
├── tailwind.config.ts              # Tailwind config
├── tsconfig.json                   # TypeScript config
└── README.md                       # This file
```

## Usage Examples

### Initialize FHEVM

```tsx
// app/providers.tsx
import { initializeFhevm } from '@fhevm/sdk';

useEffect(() => {
  if (walletClient) {
    initializeFhevm(
      {
        chainId: 11155111,
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL!,
      },
      walletClient
    );
  }
}, [walletClient]);
```

### Encrypt Data

```tsx
import { useEncryptedInput } from '@fhevm/sdk/react';

function MyComponent() {
  const { encrypted, encrypt } = useEncryptedInput('uint32');

  const handleEncrypt = async () => {
    await encrypt(100);
    // Use encrypted.data
  };
}
```

### Decrypt Data

```tsx
import { useDecryption } from '@fhevm/sdk/react';

function MyComponent() {
  const { decrypted, decrypt } = useDecryption();

  const handleDecrypt = async () => {
    await decrypt({
      contractAddress: '0x...',
      handle: '0x...',
      userAddress: address
    });
    // Use decrypted value
  };
}
```

### Interact with Contracts

```tsx
import { useFhevmContract } from '@fhevm/sdk/react';

function MyComponent() {
  const contract = useFhevmContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    signerOrProvider: signer
  });

  const handleCall = async () => {
    const tx = await contract.someFunction(arg1, arg2);
    await tx.wait();
  };
}
```

## Building for Production

```bash
npm run build
npm start
```

## Key Components

### API Routes

#### Encryption API (`/api/fhe/encrypt`)
Handles encryption of values using FHE:
```bash
POST /api/fhe/encrypt
{
  "value": 100,
  "type": "uint32"
}
```

#### Decryption API (`/api/fhe/decrypt`)
Handles decryption with EIP-712 signatures:
```bash
POST /api/fhe/decrypt
{
  "handle": "0x...",
  "contractAddress": "0x...",
  "userAddress": "0x...",
  "signature": "0x..."
}
```

#### Computation API (`/api/fhe/compute`)
Performs homomorphic operations:
```bash
POST /api/fhe/compute
{
  "operation": "add",
  "operands": ["0xhandle1", "0xhandle2"],
  "type": "uint32"
}
```

### Custom Hooks

#### `useFHE()`
Core hook for FHE operations:
```tsx
const { instance, isInitialized, encrypt, decrypt, error } = useFHE();
```

#### `useEncryption(options)`
Hook for encryption with state management:
```tsx
const { encrypt, encrypted, isEncrypting, error } = useEncryption({
  type: 'uint32',
  onSuccess: (encrypted) => console.log('Done!'),
});
```

#### `useComputation()`
Hook for homomorphic computations:
```tsx
const { compute, result, isComputing, error } = useComputation();
await compute('add', [handle1, handle2]);
```

### UI Components

Reusable components for building FHE applications:

- **Button**: Flexible button with loading states and variants
- **Input**: Input field with validation and error display
- **Card**: Container component with header, content, and footer

### Example Use Cases

#### Banking Example
Demonstrates private balance management:
- Encrypt account balances
- Make private transfers
- Verify funds without revealing amounts

#### Medical Example
Shows encrypted health records:
- Store sensitive medical data
- Share with providers securely
- Maintain patient privacy

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [API Reference](../../docs/API.md)
- [Architecture Overview](../../docs/ARCHITECTURE.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zama FHEVM](https://docs.zama.ai)

## License

MIT
