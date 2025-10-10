# Next.js FHEVM SDK Example

Complete Next.js 14 application demonstrating the FHEVM SDK.

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Rainbow Kit wallet connection
- ✅ FHEVM SDK integration
- ✅ Encryption/Decryption demos
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
│   ├── components/
│   │   ├── EncryptionDemo.tsx      # Encryption demo
│   │   ├── DecryptionDemo.tsx      # Decryption demo
│   │   └── ContractInteraction.tsx # Contract interaction
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Home page
│   ├── providers.tsx               # App providers
│   └── globals.css                 # Global styles
├── public/                         # Static files
├── .env.example                    # Environment template
├── next.config.js                  # Next.js config
├── tailwind.config.ts              # Tailwind config
└── tsconfig.json                   # TypeScript config
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

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zama FHEVM](https://docs.zama.ai)

## License

MIT
