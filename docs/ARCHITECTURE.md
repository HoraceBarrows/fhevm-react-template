# Architecture Overview

This document explains the architecture and design decisions of the FHEVM SDK.

## Project Structure

```
fhevm-react-template/
├── packages/
│   └── fhevm-sdk/              # Core SDK package
│       ├── src/
│       │   ├── client.ts        # FHEVM client implementation
│       │   ├── encryption.ts    # Encryption utilities
│       │   ├── init.ts          # Initialization helpers
│       │   ├── react.tsx        # React hooks
│       │   ├── types.ts         # TypeScript definitions
│       │   ├── utils.ts         # Utility functions
│       │   └── index.ts         # Main exports
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
│
├── examples/                    # Example applications
│   ├── nextjs-app/             # Next.js demo
│   └── sports-group-buying/    # Production dApp
│
├── templates/                   # Symlink to examples/
├── docs/                        # Documentation
└── README.md
```

## Design Principles

### 1. Framework Agnostic Core

The core SDK (`packages/fhevm-sdk`) is designed to work in any JavaScript environment:

- **No Framework Dependencies**: Core functionality uses only ethers.js
- **Modular Exports**: Import only what you need
- **Adaptable**: Framework-specific adapters built on top of core

```typescript
// Core - works anywhere
import { createFhevmInstance, encryptInput } from '@fhevm/sdk';

// React - builds on core
import { useEncryptedInput } from '@fhevm/sdk/react';
```

### 2. wagmi-like API

The React hooks follow wagmi's patterns for familiarity:

- **Consistent Naming**: `useFhevmInstance`, `useEncryptedInput`, `useDecryption`
- **Loading States**: Built-in `isEncrypting`, `isDecrypting` states
- **Error Handling**: Automatic error capture and reporting
- **Callbacks**: Optional `onSuccess` and `onError` handlers

### 3. Type Safety

Full TypeScript support throughout:

- **Strict Types**: All functions and hooks are fully typed
- **Type Inference**: Automatic type detection where possible
- **Exports**: All types exported for consumer use

### 4. Developer Experience

Optimized for ease of use:

- **Minimal Setup**: <10 lines to get started
- **Clear Errors**: Descriptive error messages
- **IntelliSense**: Full autocomplete support
- **Documentation**: Inline JSDoc comments

## Core Components

### FHEVM Client (`client.ts`)

Manages the connection to the FHEVM network:

```typescript
class FhevmClient {
  - encrypt(value, type): Encrypt data
  - decrypt(handle, contract): Decrypt data
  - getPublicKey(): Get encryption key
  - isReady(): Check initialization
}
```

**Responsibilities:**
- Initialize FHEVM instance
- Manage encryption keys
- Handle network communication
- Cache frequently used data

### Encryption Module (`encryption.ts`)

Handles all encryption operations:

```typescript
- encryptInput(value, type): Single value encryption
- encryptBatch(inputs): Batch encryption
- validateType(type): Type validation
```

**Features:**
- Type checking and validation
- Efficient batch processing
- Error handling and recovery
- Format conversions

### React Hooks (`react.tsx`)

Provides React integration:

```typescript
- useFhevmInstance(): Get client instance
- useEncryptedInput(type, options): Encryption hook
- useDecryption(): Decryption hook
- useFhevmContract(options): Contract hook
- useEncryptedState(contract, fn, args): State watching hook
```

**Features:**
- State management
- Loading indicators
- Error boundaries
- Automatic cleanup

### Utilities (`utils.ts`)

Helper functions for common operations:

```typescript
- formatHandle(handle): Format display
- formatEther(wei): Format currency
- isValidAddress(address): Validation
- parseValue(value, type): Parsing
```

## Data Flow

### Encryption Flow

```
User Input → Validate → Encrypt → Format → Contract Call
     ↓          ↓         ↓         ↓          ↓
  Component   Types    FHEVM    Ethers    Blockchain
```

1. **Input**: User provides value in component
2. **Validate**: Type checking and range validation
3. **Encrypt**: FHEVM encryption with public key
4. **Format**: Convert to contract-compatible format
5. **Send**: Transaction to blockchain

### Decryption Flow

```
Contract → Read Handle → Request Gateway → Sign → Decrypt → Display
    ↓          ↓              ↓            ↓       ↓        ↓
Blockchain   Ethers        Network      Wallet   FHEVM   Component
```

1. **Read**: Get encrypted handle from contract
2. **Request**: Send decryption request to gateway
3. **Sign**: User signs EIP-712 message
4. **Decrypt**: Gateway decrypts with user signature
5. **Display**: Show decrypted value to user

## State Management

### Global State

- **FHEVM Instance**: Singleton client instance
- **Configuration**: Network and gateway settings
- **Public Key**: Cached encryption key

### Component State

React hooks manage local state:

```typescript
{
  data: encrypted/decrypted value,
  isLoading: boolean,
  error: Error | null
}
```

## Error Handling

Comprehensive error handling at every level:

1. **Validation Errors**: Type and range checks
2. **Network Errors**: RPC and gateway failures
3. **Encryption Errors**: FHEVM operation failures
4. **User Errors**: Wallet and signature issues

All errors are:
- Caught and wrapped with context
- Exposed through hooks/functions
- Logged for debugging
- User-friendly messages

## Security Considerations

### Client-Side Encryption

- All encryption happens client-side
- Private keys never leave user device
- Public key fetched from network

### EIP-712 Signatures

- Used for decryption authorization
- Prevents unauthorized decryption
- Domain-specific signatures

### Input Validation

- Type checking before encryption
- Range validation for numbers
- Address format verification

## Performance Optimizations

### Caching

- Public key caching
- Instance reuse
- Memoized computations

### Batch Operations

- Batch encryption support
- Reduced network calls
- Optimized gas usage

### Lazy Loading

- On-demand initialization
- Conditional imports
- Code splitting support

## Testing Strategy

### Unit Tests

- Individual function testing
- Mock dependencies
- Edge case coverage

### Integration Tests

- End-to-end flows
- Network interaction
- Real contract testing

### E2E Tests

- User flow testing
- Browser automation
- Multi-framework testing

## Extension Points

The SDK is designed for extensibility:

### Custom Adapters

Add framework-specific adapters:

```typescript
// packages/fhevm-sdk/src/vue.ts
export function useFhevm() {
  // Vue composition API
}
```

### Custom Utilities

Extend with domain-specific helpers:

```typescript
// your-app/utils/fhe-helpers.ts
import { encryptInput } from '@fhevm/sdk';

export async function encryptMedicalRecord(record) {
  // Custom logic
}
```

### Custom Hooks

Build specialized hooks:

```typescript
// your-app/hooks/usePrivateBalance.ts
import { useEncryptedInput, useDecryption } from '@fhevm/sdk/react';

export function usePrivateBalance() {
  // Specialized logic
}
```

## Future Enhancements

Planned improvements:

- [ ] Vue adapter
- [ ] Svelte adapter
- [ ] WebSocket support
- [ ] Advanced caching
- [ ] Batch decryption
- [ ] Offline support
- [ ] Performance monitoring

## Resources

- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [fhevmjs Library](https://github.com/zama-ai/fhevmjs)
- [Zama Gateway](https://gateway.zama.ai)
