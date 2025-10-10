# Quick Start Guide

Get up and running with the FHEVM SDK in under 5 minutes!

## 🚀 30-Second Setup

```bash
# 1. Navigate to project
cd fhevm-react-template

# 2. Install dependencies (this may take a minute)
npm install

# 3. Build the SDK
npm run build:sdk

# 4. Start Next.js demo
npm run dev:nextjs
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 📦 What Just Happened?

1. **Installed packages**: All dependencies for the SDK and examples
2. **Built SDK**: Compiled the TypeScript SDK to JavaScript
3. **Started demo**: Launched the Next.js application

## 🎯 Try It Out

### Connect Wallet

1. Click "Connect Wallet" in the top right
2. Choose MetaMask or WalletConnect
3. Connect to Sepolia testnet

### Encrypt Data

1. Scroll to "Encryption Demo"
2. Select data type (uint32, uint64, bool, address)
3. Enter a value
4. Click "Encrypt"
5. See the encrypted result!

### Decrypt Data

1. Scroll to "Decryption Demo"
2. Enter contract address and handle (from previous encryption)
3. Your wallet address is auto-filled
4. Click "Decrypt"
5. See the original value revealed!

### Place Order

1. Scroll to "Contract Interaction"
2. Enter contract address and product ID
3. Enter quantity (will be encrypted automatically)
4. Click "Place Order"
5. Watch the encryption and transaction flow!

## 🏀 Sports Group Buying Example

Want to see a complete dApp?

```bash
# In a new terminal
cd examples/sports-group-buying

# Deploy contract (requires .env configuration)
npm run deploy

# Start frontend
npm run dev
```

Open [http://localhost:3001](http://localhost:3001)

## 📚 Learn More

### SDK Usage

```typescript
// Install in your project
npm install @fhevm/sdk ethers

// Initialize
import { createFhevmInstance } from '@fhevm/sdk';
const client = await createFhevmInstance(config, provider);

// Encrypt
const encrypted = await client.encrypt32(100);

// Use in contract
await contract.placeOrder(productId, encrypted.data);
```

### React Hooks

```tsx
import { useEncryptedInput } from '@fhevm/sdk/react';

function MyComponent() {
  const { encrypted, encrypt } = useEncryptedInput('uint32');

  const handleSubmit = async () => {
    await encrypt(100);
    // Use encrypted.data
  };
}
```

## 🐛 Troubleshooting

### "npm install" fails

Make sure you have:
- Node.js 18+ installed
- npm 9+ installed
- Internet connection

### "npm run build:sdk" fails

Check:
- All dependencies installed
- TypeScript version 5.3+
- No conflicting global packages

### Next.js app won't start

Verify:
- Port 3000 is available
- .env configuration (optional)
- No syntax errors in code

### Can't connect wallet

Ensure:
- MetaMask/WalletConnect installed
- Connected to Sepolia testnet
- Browser extensions enabled

## 💡 Common Issues

**Issue**: "FHEVM client not initialized"
**Solution**: Make sure to initialize the SDK before using hooks

**Issue**: Encryption takes too long
**Solution**: This is normal on first run, subsequent encryptions are faster

**Issue**: Transaction fails
**Solution**: Check you have Sepolia ETH and correct contract address

## 🎓 Next Steps

1. **Read Documentation**: Check [README.md](./README.md) for full docs
2. **Explore Examples**: Look at code in `examples/` directory
3. **Try SDK**: Use the SDK in your own project
4. **Watch Video**: See [VIDEO_DEMO_GUIDE.md](./VIDEO_DEMO_GUIDE.md)
5. **Contribute**: Read [CONTRIBUTING.md](./CONTRIBUTING.md)

## 📞 Get Help

- **Documentation**: [README.md](./README.md)
- **SDK Docs**: [packages/fhevm-sdk/README.md](./packages/fhevm-sdk/README.md)
- **Examples**: [examples/](./examples/)
- **Issues**: GitHub Issues
- **Discord**: Zama Community

## ✅ Checklist

Before you start coding:

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] SDK built (`npm run build:sdk`)
- [ ] Demo running (`npm run dev:nextjs`)
- [ ] Wallet connected
- [ ] Sepolia testnet configured

You're ready to build confidential dApps! 🎉

---

**Need more help?** Check the full [README.md](./README.md) or open an issue on GitHub.
