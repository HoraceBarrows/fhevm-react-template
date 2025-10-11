# Video Demo Guide for demo.mp4

This guide outlines what should be included in the `demo.mp4` video demonstration.

## 📹 Video Duration

Recommended: 5-10 minutes

## 🎬 Video Structure

### Part 1: Introduction (30 seconds)

- **Title Slide**: "FHEVM SDK - Universal SDK for Confidential dApps"
- **Overview**: Brief introduction to the project
- **Key Features**: Framework-agnostic, wagmi-like API, <10 lines to start

### Part 2: Project Structure (1 minute)

- **Show Repository Structure**:
  ```
  fhevm-react-template/
  ├── packages/fhevm-sdk/     # The SDK
  ├── examples/nextjs-app/    # Next.js demo
  └── examples/sports-group-buying/  # Complete dApp
  ```
- **Highlight Key Files**:
  - `packages/fhevm-sdk/src/` - Core SDK implementation
  - `packages/fhevm-sdk/README.md` - API documentation
  - `examples/` - Example applications

### Part 3: SDK Installation & Setup (1.5 minutes)

**Show Terminal**:

```bash
# Clone repository
git clone https://github.com/your-org/fhevm-react-template.git
cd fhevm-react-template

# Install all dependencies
npm install

# Build the SDK
npm run build:sdk
```

**Show Code Editor**:

```typescript
// Quick setup example
import { createFhevmInstance, encryptInput } from '@fhevm/sdk';

// Initialize in <10 lines
const client = await createFhevmInstance({ ... }, provider);
const encrypted = await encryptInput(100, 'uint32');
```

### Part 4: Next.js Demo Application (2 minutes)

**Terminal**:
```bash
npm run dev:nextjs
```

**Browser Demo**:

1. **Landing Page**:
   - Show overview of FHEVM SDK
   - Highlight 3 key features (Framework Agnostic, Simple API, Full Privacy)

2. **Connect Wallet**:
   - Click "Connect Wallet" button
   - Connect with MetaMask/WalletConnect

3. **Encryption Demo**:
   - Select data type (uint32, uint64, bool, address)
   - Enter a value (e.g., 100)
   - Click "Encrypt"
   - Show encrypted result with data and proof

4. **Decryption Demo**:
   - Enter contract address
   - Enter encrypted handle
   - Click "Decrypt"
   - Show decrypted value

5. **Contract Interaction**:
   - Enter contract address and product ID
   - Enter quantity to encrypt
   - Click "Place Order"
   - Show transaction flow (Encrypting → Sending → Success)

### Part 5: Sports Group Buying dApp (2.5 minutes)

**Terminal**:
```bash
cd examples/sports-group-buying
npm run compile
npm run deploy
# Show contract address and Etherscan link

npm run dev
```

**Browser Demo**:

1. **Product Browsing**:
   - Show list of available products
   - Display product details (name, price, min/max quantity)

2. **Place Anonymous Order**:
   - Select a product
   - Enter quantity (will be encrypted)
   - Submit encrypted order
   - Show order confirmation

3. **View Statistics**:
   - Show anonymous statistics
   - Display total participants (not individual amounts)
   - Show target progress

4. **Reveal Order** (Optional):
   - Select "Reveal Order" button
   - Sign EIP-712 message
   - Show decrypted quantity

5. **Smart Contract**:
   - Show contract code snippet
   - Highlight FHE types (euint32, euint64)
   - Explain encrypted operations

### Part 6: SDK Features Deep Dive (1.5 minutes)

**Show Code Examples**:

1. **React Hooks**:
```tsx
const { encrypted, encrypt } = useEncryptedInput('uint32');
const { decrypted, decrypt } = useDecryption();
const contract = useFhevmContract({ address, abi });
```

2. **Framework Agnostic**:
```typescript
// Works in Node.js
import { encryptInput } from '@fhevm/sdk';

// Works in React
import { useEncryptedInput } from '@fhevm/sdk/react';

// Works in Vue, Next.js, etc.
```

3. **Utility Functions**:
```typescript
import { formatHandle, formatEther, isValidAddress } from '@fhevm/sdk';
```

### Part 7: Design Choices & Architecture (1 minute)

**Show Diagrams**:

1. **SDK Architecture**:
   ```
   Core (Framework Agnostic)
   ├── Client
   ├── Encryption
   └── Types

   React Layer (Optional)
   └── Hooks
   ```

2. **Integration Flow**:
   ```
   App → FHEVM SDK → fhevmjs → Smart Contract
   ```

**Explain Design Decisions**:
- Why framework-agnostic core
- Why wagmi-like API for React
- Why modular structure
- How it wraps all dependencies

### Part 8: Multiple Environment Support (30 seconds)

**Quick Showcase**:
- Show it works in Next.js (already demonstrated)
- Mention Vue.js support (show code snippet)
- Mention plain Node.js support (show code snippet)
- Emphasize <10 lines to integrate

### Part 9: Conclusion & Resources (30 seconds)

**Summary**:
- ✅ Universal SDK for FHEVM
- ✅ Framework agnostic
- ✅ wagmi-like React hooks
- ✅ Complete examples
- ✅ Well documented

**Resources**:
- GitHub: [Repository Link]
- Documentation: README.md
- Examples: examples/ directory
- Live Demos: [Deployment Links]

**Call to Action**:
- Try the examples
- Read the documentation
- Contribute on GitHub
- Join Zama community

## 🎥 Recording Tips

### Technical Setup

1. **Screen Recording**:
   - Use OBS Studio, Loom, or similar
   - 1920x1080 resolution minimum
   - 30 fps
   - Clear audio

2. **Browser**:
   - Full screen mode
   - Hide bookmarks bar
   - Clean desktop background

3. **Terminal**:
   - Large font size (14-16pt)
   - High contrast theme
   - Clear commands

### Presentation Tips

1. **Narration**:
   - Speak clearly and not too fast
   - Explain what you're doing
   - Highlight key features

2. **Transitions**:
   - Smooth transitions between sections
   - Brief pauses for clarity
   - Use cursor to highlight important parts

3. **Code**:
   - Use syntax highlighting
   - Zoom in on important code
   - Explain key concepts

4. **Demo**:
   - Show realistic use cases
   - Handle errors gracefully
   - Emphasize user experience

## 📝 Video Script Template

```
[00:00-00:30] Introduction
"Welcome to the FHEVM SDK demonstration. This is a universal SDK
for building confidential dApps that works with any JavaScript framework..."

[00:30-01:30] Project Structure
"Let me show you the project structure. We have the core SDK package,
a Next.js demo, and a complete sports group buying dApp example..."

[01:30-03:00] SDK Setup
"Getting started is incredibly simple. Just install, build, and
you're ready to go in less than 10 lines of code..."

[03:00-05:00] Next.js Demo
"Here's our Next.js demo showing the SDK in action. Let me connect
my wallet and demonstrate encryption..."

[05:00-07:30] Sports Group Buying
"Now let's look at a production-ready dApp. This platform enables
anonymous group purchasing with FHE encryption..."

[07:30-09:00] Features & Architecture
"The SDK is designed to be framework-agnostic with an optional
React layer that provides wagmi-like hooks..."

[09:00-10:00] Conclusion
"That's the FHEVM SDK - making confidential smart contracts
accessible to every developer. Try it out, read the docs,
and join our community!"
```

## 📤 Export Settings

- **Format**: MP4 (H.264)
- **Resolution**: 1920x1080
- **Frame Rate**: 30 fps
- **Bitrate**: 5-10 Mbps
- **Audio**: AAC, 128-192 kbps
- **File Size**: Target < 100 MB

## ✅ Pre-Recording Checklist

- [ ] All examples working
- [ ] Dependencies installed
- [ ] Contracts deployed
- [ ] Wallet with test ETH
- [ ] Clean browser/terminal
- [ ] Script prepared
- [ ] Recording software tested
- [ ] Microphone tested

## 📋 Post-Recording Checklist

- [ ] Video quality check
- [ ] Audio quality check
- [ ] All features demonstrated
- [ ] No errors shown
- [ ] Smooth transitions
- [ ] Clear narration
- [ ] Proper export format

---

**Note**: The actual `demo.mp4` file should be recorded following this guide and placed in the root directory of the repository.
