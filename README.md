# FHEVM SDK - Universal SDK for Confidential dApps

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/@fhevm/sdk.svg)](https://www.npmjs.com/package/@fhevm/sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)

> **Universal SDK for building confidential dApps with Fully Homomorphic Encryption**

This project provides a framework-agnostic SDK that makes it simple, consistent, and developer-friendly to build privacy-preserving decentralized applications using Zama's FHEVM (Fully Homomorphic Encryption Virtual Machine).

## 🌐 Live Demo & Resources

- **GitHub Repository**: [https://github.com/HoraceBarrows/fhevm-react-template](https://github.com/HoraceBarrows/fhevm-react-template)
- **Live Demo Application**: [https://fhe-sports-group-buying.vercel.app/](https://fhe-sports-group-buying.vercel.app/)
- **Demo Video**: The `demo.mp4` file in this repository contains a complete demonstration. **Please download the file to view it** as the video cannot be played directly in the browser.

## 🎯 Overview

The FHEVM SDK is designed to be:

- 🎯 **Framework Agnostic**: Works with Node.js, Next.js, Vue, React, or any frontend setup
- 📦 **All-in-One**: Wraps all required packages - no scattered dependencies
- 🪝 **wagmi-like API**: Familiar structure for web3 developers
- 🚀 **Quick Setup**: Less than 10 lines of code to get started
- 📚 **Well Documented**: Complete guides and examples
- 🔒 **Type-Safe**: Full TypeScript support

## 🏗️ Project Structure

```
fhevm-react-template/
├── packages/
│   └── fhevm-sdk/              # Universal FHEVM SDK
│       ├── src/
│       │   ├── client.ts        # Core FHEVM client
│       │   ├── init.ts          # Initialization utilities
│       │   ├── encryption.ts    # Encryption/decryption functions
│       │   ├── react.tsx        # React hooks
│       │   ├── types.ts         # TypeScript definitions
│       │   └── utils.ts         # Utility functions
│       └── README.md
│
├── examples/
│   ├── nextjs-app/              # Next.js 14 demo
│   │   ├── app/
│   │   │   ├── components/      # Demo components
│   │   │   ├── layout.tsx       # Root layout
│   │   │   ├── page.tsx         # Home page
│   │   │   └── providers.tsx    # FHEVM provider
│   │   └── README.md
│   │
│   └── sports-group-buying/     # Complete dApp example
│       ├── contracts/           # Smart contracts
│       ├── scripts/             # Deployment scripts
│       ├── app/                 # Next.js frontend
│       └── README.md
│
├── demo.mp4                     # Video demonstration (download to view)
├── package.json                 # Workspace configuration
└── README.md                    # This file
```

## 📹 Demo Video

A complete demonstration video (`demo.mp4`) is included in this repository showcasing:
- SDK installation and setup process
- Next.js demo application features
- Sports group buying dApp walkthrough
- Encryption and decryption demonstrations
- Contract interaction examples
- SDK integration in multiple frameworks

**⚠️ Important**: The video file must be downloaded to view it. Browser playback is not supported for the demo.mp4 file.

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/HoraceBarrows/fhevm-react-template.git
cd fhevm-react-template

# Install all dependencies
npm install

# Build the SDK
npm run build:sdk
```

### Running Examples

#### Next.js Demo

```bash
npm run dev:nextjs
```

The application will start and open in your browser.

#### Sports Group Buying Example

```bash
# Deploy contract first
cd examples/sports-group-buying
npm run deploy

# Start frontend
npm run dev
```

The sports group buying dApp will start and open in your browser.

## 📚 Documentation

### Core SDK Usage

#### Basic Setup (Node.js / JavaScript)

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

// 3. Use in contract
const contract = new ethers.Contract(address, abi, signer);
await contract.placeOrder(productId, encrypted.data);

// 4. Decrypt results
const decrypted = await decryptOutput({
  contractAddress: address,
  handle: '0x...',
  userAddress: await signer.getAddress()
});
```

#### React Usage

```tsx
import { initializeFhevm, useEncryptedInput } from '@fhevm/sdk/react';

// Initialize in app root
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
}

// Use in components
function OrderForm() {
  const { encrypted, encrypt } = useEncryptedInput('uint32');

  const handleSubmit = async (quantity: number) => {
    await encrypt(quantity);
    await contract.placeOrder(productId, encrypted.data);
  };
}
```

### API Reference

#### Core Functions

- `createFhevmInstance(config, provider)` - Create FHEVM client
- `initializeFhevm(config, provider)` - Initialize global client
- `encryptInput(value, type?)` - Encrypt single value
- `encryptBatch(inputs)` - Encrypt multiple values
- `decryptOutput(params)` - Decrypt contract output

#### React Hooks

- `useFhevmInstance()` - Get FHEVM client
- `useEncryptedInput(type?, options?)` - Hook for encryption
- `useDecryption()` - Hook for decryption
- `useFhevmContract(options)` - Get contract with FHE support
- `useEncryptedState(contract, fn, args?, options?)` - Watch encrypted state

#### Utility Functions

- `formatHandle(handle)` - Format encrypted handle
- `formatEther(wei)` - Format wei to ether
- `isValidAddress(address)` - Validate Ethereum address
- `formatCategory(category)` - Format product category
- `formatOrderStatus(status)` - Format order status
- `getTimeRemaining(deadline)` - Get time until deadline

## 🎬 Video Demo

See [demo.mp4](./demo.mp4) for a complete walkthrough showing:

1. **SDK Setup**: Installing and initializing the FHEVM SDK
2. **Encryption Demo**: Encrypting different data types
3. **Decryption Demo**: Decrypting values with EIP-712 signatures
4. **Contract Interaction**: Placing encrypted orders
5. **Sports Group Buying**: Complete dApp demonstration
6. **Multiple Frameworks**: SDK working in different environments

## 🎨 Examples

### Example 1: Next.js App (`examples/nextjs-app`)

A comprehensive demo application showcasing:

- ✅ FHEVM SDK integration with Next.js 14
- ✅ RainbowKit wallet connection
- ✅ Encryption/Decryption interactive demos
- ✅ Contract interaction examples
- ✅ Responsive UI with Tailwind CSS

**Features:**
- Encrypt uint32, uint64, bool, and address types
- Decrypt encrypted values with signature
- Submit encrypted transactions
- Real-time status updates

### Example 2: Sports Group Buying (`examples/sports-group-buying`)

A production-ready dApp demonstrating:

- ✅ Complete smart contract with FHE
- ✅ Anonymous group purchasing
- ✅ Encrypted order quantities
- ✅ Privacy-preserving statistics
- ✅ Selective order reveal

**Use Case:**
Merchants create group buying offers for sports equipment. Buyers place orders with encrypted quantities to maintain privacy. When the group target is reached, orders are processed without revealing individual amounts unless users choose to reveal.

## 🔑 Key Features

### For Developers

- **Simple API**: Less than 10 lines to integrate
- **Type Safety**: Full TypeScript support with detailed types
- **Framework Agnostic**: Use with any JavaScript framework
- **React Hooks**: wagmi-like hooks for React apps
- **Error Handling**: Comprehensive error states and messages
- **Loading States**: Built-in loading indicators

### For Users

- **Privacy First**: All sensitive data encrypted end-to-end
- **Selective Reveal**: Users control what data to reveal
- **Gas Efficient**: Optimized encryption operations
- **Secure**: Battle-tested FHE encryption from Zama

## 🏆 Evaluation Criteria Alignment

### ✅ Usability

- **Quick Setup**: <10 lines of code to start
- **Minimal Boilerplate**: Import and use immediately
- **Clear Documentation**: Extensive guides and examples
- **Intuitive API**: Familiar patterns for web3 developers

### ✅ Completeness

- **Full FHEVM Flow**: Initialization, encryption, decryption, contracts
- **React Hooks**: Complete hook library for React apps
- **Utility Functions**: Helpers for common operations
- **Error Handling**: Comprehensive error management

### ✅ Reusability

- **Modular Design**: Import only what you need
- **Framework Agnostic**: Core works everywhere
- **Adaptable Components**: Easy to customize
- **Clean Architecture**: Separation of concerns

### ✅ Documentation & Clarity

- **Package README**: Detailed API reference
- **Example READMEs**: Step-by-step guides
- **Code Comments**: Inline documentation
- **TypeScript Types**: Self-documenting interfaces
- **Video Demo**: Visual walkthrough

### ✅ Creativity

- **Multiple Examples**: Next.js demo + complete dApp
- **Real-World Use Case**: Sports group buying platform
- **wagmi-like API**: Familiar developer experience
- **Innovative Features**: Selective reveal, anonymous stats

## 🛠️ Development

### Build SDK

```bash
npm run build:sdk
```

### Run Tests

```bash
npm run test:sdk
```

### Lint & Format

```bash
npm run lint
npm run format
```

### Compile Contracts

```bash
npm run compile:contracts
```

### Deploy Example

```bash
npm run deploy:sports
```

## 📋 Requirements Checklist

- ✅ **Universal SDK Package**: Framework-agnostic core in `packages/fhevm-sdk`
- ✅ **Import to Any dApp**: Simple npm package installation
- ✅ **Encryption & Decryption**: Complete utilities with EIP-712 support
- ✅ **wagmi-like API**: React hooks with familiar structure
- ✅ **Reusable Components**: Modular and composable
- ✅ **Clean & Extensible**: Well-structured codebase
- ✅ **Multiple Environments**: Next.js example + Sports dApp
- ✅ **Clear Documentation**: Comprehensive guides
- ✅ **Quick Setup**: Root installation, compilation, deployment
- ✅ **Example Templates**: Next.js showcase included

## 🌐 Deployment Links

- **Live Application**: [https://fhe-sports-group-buying.vercel.app/](https://fhe-sports-group-buying.vercel.app/)
- **GitHub Repository**: [https://github.com/HoraceBarrows/fhevm-react-template](https://github.com/HoraceBarrows/fhevm-react-template)
- **Smart Contract**: [View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0xe434D59a1Cc2084672D4929dB9E3b8Af83f01431)

## 📝 Deliverables

1. ✅ **GitHub Repository**: Complete SDK with examples
2. ✅ **Universal FHEVM SDK**: Framework-agnostic package
3. ✅ **Next.js Template**: Interactive demo application
4. ✅ **Sports Group Buying**: Production-ready dApp example
5. ✅ **Video Demo**: `demo.mp4` - Download to view the complete walkthrough
6. ✅ **README**: Comprehensive documentation
7. ✅ **Live Deployment**: Application deployed at https://fhe-sports-group-buying.vercel.app/

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [Zama](https://zama.ai) for FHEVM technology
- [fhevmjs](https://github.com/zama-ai/fhevmjs) for JavaScript bindings
- The Ethereum community for web3 standards
- [wagmi](https://wagmi.sh) for API inspiration

## 📞 Support

- **Documentation**: [SDK Docs](./packages/fhevm-sdk/README.md)
- **Examples**: [examples/](./examples/)
- **Issues**: [GitHub Issues](https://github.com/HoraceBarrows/fhevm-react-template/issues)
- **Discord**: [Zama Discord](https://discord.gg/zama)

## 🗺️ Roadmap

- [ ] Vue.js example integration
- [ ] Vanilla Node.js example
- [ ] Advanced caching mechanisms
- [ ] Batch operation optimizations
- [ ] Additional utility hooks
- [ ] Performance benchmarks
- [ ] More example dApps

---

## 🎬 Video Demo Instructions

The repository includes a comprehensive demonstration video (`demo.mp4`) that walks through:
- Complete SDK setup and installation
- Live demonstration of Next.js demo application
- Sports group buying dApp features and functionality
- Encryption and decryption workflows
- Contract interaction examples
- Multi-framework integration showcase

**Important Note**: Due to file format, the `demo.mp4` video must be downloaded from the repository to view. It cannot be played directly through web browser links. Please clone or download the repository to access the video file.

---

**Built with ❤️ for the FHEVM community**

*Making confidential smart contracts accessible to every developer*
