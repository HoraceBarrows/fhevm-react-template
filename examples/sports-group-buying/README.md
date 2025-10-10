# Sports Group Buying - FHEVM SDK Example

Anonymous sports equipment group purchasing platform powered by FHEVM SDK.

## Overview

This example demonstrates a complete dApp built with the FHEVM SDK that enables:

- 🛒 **Anonymous Group Buying**: Place orders with encrypted quantities
- 🔒 **Privacy-Preserving**: Order details remain confidential using FHE
- 👥 **Group Discounts**: Reach target thresholds for better prices
- 🎯 **Target Tracking**: Monitor progress without revealing individual orders
- 🔓 **Selective Reveal**: Users can reveal their orders when desired

## Features

### Smart Contract (Solidity + FHEVM)

- Product creation by merchants
- Encrypted order placement
- Group target tracking
- Order reveal mechanism
- Merchant fund withdrawal
- Emergency pause functionality

### Frontend (Next.js + FHEVM SDK)

- Product browsing and filtering
- Encrypted order submission
- Order status tracking
- Decryption and reveal
- Real-time statistics

## Getting Started

### 1. Install Dependencies

From the root directory:

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PRIVATE_KEY=your_private_key
ETHERSCAN_API_KEY=your_api_key
```

### 3. Compile Contracts

```bash
npm run compile
```

### 4. Deploy Contract

```bash
npm run deploy
```

This will:
- Deploy the AnonymousSportsGroupBuying contract
- Save deployment info to `deployments/sepolia.json`
- Display contract address and Etherscan link

### 5. Run Frontend

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001)

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                            │
│  Next.js + FHEVM SDK + RainbowKit + Wagmi                  │
└───────────────────┬─────────────────────────────────────────┘
                    │ FHEVM SDK API
                    │ (Encryption/Decryption)
                    │
┌───────────────────▼─────────────────────────────────────────┐
│                    Smart Contract                           │
│  AnonymousSportsGroupBuying.sol (Solidity 0.8.24)         │
│  - FHE encrypted data types (euint32, euint64)             │
│  - Privacy-preserving operations                            │
└─────────────────────────────────────────────────────────────┘
```

## FHEVM SDK Integration

### Initialize SDK

```typescript
import { initializeFhevm } from '@fhevm/sdk';

await initializeFhevm(
  {
    chainId: 11155111,
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL!,
  },
  walletClient
);
```

### Encrypt Order Quantity

```typescript
import { useEncryptedInput } from '@fhevm/sdk/react';

function OrderForm() {
  const { encrypted, encrypt } = useEncryptedInput('uint32');

  const handleSubmit = async (quantity: number) => {
    // Encrypt quantity
    await encrypt(quantity);

    // Submit to contract
    await contract.placeOrder(productId, quantity, {
      value: totalAmount
    });
  };
}
```

### Decrypt Order Details

```typescript
import { useDecryption } from '@fhevm/sdk/react';

function OrderDetails({ orderId }) {
  const { decrypted, decrypt } = useDecryption();

  const handleReveal = async () => {
    await decrypt({
      contractAddress: CONTRACT_ADDRESS,
      handle: orderHandle,
      userAddress: address
    });
  };

  return <div>Quantity: {decrypted}</div>;
}
```

## Smart Contract Functions

### For Merchants

- `createProduct()`: Create new group buying product
- `processGroupOrder()`: Process orders after target reached
- `withdrawFunds()`: Withdraw collected funds
- `deactivateProduct()`: Deactivate a product

### For Buyers

- `placeOrder()`: Place order with encrypted quantity
- `revealOrder()`: Reveal encrypted order details
- `cancelOrder()`: Cancel pending order

### View Functions

- `getProductInfo()`: Get product details
- `getOrderInfo()`: Get order information
- `getAnonymousStats()`: Get aggregated statistics
- `checkGroupTarget()`: Check if target reached

## Contract Structure

```solidity
struct Product {
    uint256 id;
    string name;
    uint256 unitPrice;
    uint256 minOrderQuantity;  // Group target
    uint256 maxOrderQuantity;
    ProductCategory category;
    uint256 deadline;
    bool active;
    address merchant;
}

struct GroupOrder {
    uint256 id;
    uint256 productId;
    euint32 encryptedQuantity;    // FHE encrypted
    euint64 encryptedTotalAmount; // FHE encrypted
    address buyer;
    OrderStatus status;
    bool isRevealed;
}

struct AnonymousStats {
    uint256 totalParticipants;
    euint64 totalCollectedAmount; // FHE encrypted
    euint32 totalQuantity;        // FHE encrypted
    bool targetReached;
}
```

## Product Categories

- FOOTWEAR: Sports shoes, cleats
- CLOTHING: Jerseys, shorts, jackets
- EQUIPMENT: Balls, rackets, bats
- ACCESSORIES: Bags, gloves, helmets
- FITNESS: Weights, mats, bands

## Testing

```bash
# Run tests
npm run test

# With gas reporting
REPORT_GAS=true npm run test

# Coverage
npm run coverage
```

## Deployment

### Sepolia Testnet

1. Get Sepolia ETH from [faucet](https://sepoliafaucet.com/)
2. Configure `.env` with private key
3. Deploy:

```bash
npm run deploy
```

### Verify on Etherscan

```bash
npx hardhat verify --network sepolia DEPLOYED_ADDRESS
```

## Security Features

- ✅ FHE encryption for sensitive data
- ✅ Access control (owner, merchant, buyer)
- ✅ Reentrancy protection
- ✅ Input validation
- ✅ Emergency pause
- ✅ Secure fund withdrawal

## Example Use Case

1. **Merchant** creates a group buying offer:
   - Product: "Premium Running Shoes"
   - Unit Price: 0.01 ETH
   - Min Quantity: 10 (to activate)
   - Max Quantity: 100
   - Deadline: 7 days

2. **Buyers** place orders with encrypted quantities:
   - Alice orders 5 pairs (encrypted)
   - Bob orders 8 pairs (encrypted)
   - Carol orders 12 pairs (encrypted)
   - Total: 25 pairs (target reached! ✅)

3. **Merchant** processes the group order after target is reached

4. **Buyers** can reveal their orders when they choose:
   - Alice reveals: 5 pairs
   - Bob reveals: 8 pairs
   - Carol keeps her order private

## Resources

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Smart Contract Code](./contracts/AnonymousSportsGroupBuying.sol)
- [Deployment Guide](./DEPLOYMENT.md)
- [Zama FHEVM Docs](https://docs.zama.ai)

## License

MIT
