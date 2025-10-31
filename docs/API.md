# FHEVM SDK API Documentation

Complete API reference for the FHEVM SDK.

## Table of Contents

- [Core Functions](#core-functions)
- [React Hooks](#react-hooks)
- [Utility Functions](#utility-functions)
- [Type Definitions](#type-definitions)

## Core Functions

### `createFhevmInstance(config, provider)`

Creates and initializes a new FHEVM client instance.

**Parameters:**
- `config: FhevmConfig` - Configuration object
  - `chainId: number` - Network chain ID
  - `rpcUrl: string` - RPC endpoint URL
  - `gatewayUrl?: string` - Gateway URL for decryption (optional)
  - `aclAddress?: string` - Access Control List contract address (optional)
- `provider: ethers.Provider | ethers.Signer` - Ethers provider or signer

**Returns:** `Promise<FhevmInstance>`

**Example:**
```typescript
const client = await createFhevmInstance(
  {
    chainId: 11155111,
    rpcUrl: 'https://sepolia.infura.io/v3/YOUR_KEY'
  },
  provider
);
```

### `encryptInput(value, type)`

Encrypts a single value for contract input.

**Parameters:**
- `value: number | bigint | boolean | string` - Value to encrypt
- `type?: FHEType` - Encryption type (default: 'uint32')

**Returns:** `Promise<EncryptedValue>`

**Example:**
```typescript
const encrypted = await encryptInput(100, 'uint32');
// Use encrypted.data in contract calls
```

### `decryptOutput(params)`

Decrypts an encrypted output from a contract.

**Parameters:**
- `params: DecryptionParams`
  - `contractAddress: string` - Contract address
  - `handle: string` - Encrypted handle
  - `userAddress: string` - User address requesting decryption
  - `signature?: string` - EIP-712 signature (optional)

**Returns:** `Promise<DecryptedValue>`

**Example:**
```typescript
const decrypted = await decryptOutput({
  contractAddress: '0x...',
  handle: '0x...',
  userAddress: address
});
```

### `encryptBatch(inputs)`

Encrypts multiple values in a single operation.

**Parameters:**
- `inputs: Array<{ type: FHEType; value: any }>` - Array of values to encrypt

**Returns:** `Promise<{ encrypted: EncryptedValue[] }>`

**Example:**
```typescript
const { encrypted } = await encryptBatch([
  { type: 'uint32', value: 100 },
  { type: 'bool', value: true }
]);
```

## React Hooks

### `useFhevmInstance()`

Returns the initialized FHEVM client instance.

**Returns:** `FhevmInstance | null`

**Example:**
```tsx
const client = useFhevmInstance();
if (client) {
  // Use client for operations
}
```

### `useEncryptedInput(type?, options?)`

Hook for encrypting input values with loading states.

**Parameters:**
- `type?: FHEType` - Encryption type (default: 'uint32')
- `options?: EncryptionOptions`
  - `onSuccess?: (encrypted: EncryptedValue) => void`
  - `onError?: (error: Error) => void`

**Returns:** `UseEncryptedInputResult`
- `encrypted: EncryptedValue | null`
- `isEncrypting: boolean`
- `encrypt: (value: any) => Promise<EncryptedValue>`
- `reset: () => void`
- `error: string | null`

**Example:**
```tsx
function OrderForm() {
  const { encrypted, isEncrypting, encrypt } = useEncryptedInput('uint32');

  const handleSubmit = async (quantity: number) => {
    await encrypt(quantity);
    await contract.placeOrder(productId, encrypted.data);
  };

  return (
    <button disabled={isEncrypting} onClick={() => handleSubmit(10)}>
      {isEncrypting ? 'Encrypting...' : 'Submit Order'}
    </button>
  );
}
```

### `useDecryption()`

Hook for decrypting output values.

**Returns:** `UseDecryptionResult`
- `decrypted: DecryptedValue | null`
- `isDecrypting: boolean`
- `decrypt: (params: DecryptionParams) => Promise<DecryptedValue>`
- `reset: () => void`
- `error: string | null`

**Example:**
```tsx
function OrderDetails({ handle }) {
  const { decrypted, isDecrypting, decrypt } = useDecryption();

  const handleReveal = async () => {
    await decrypt({
      contractAddress: CONTRACT_ADDRESS,
      handle,
      userAddress: address
    });
  };

  return (
    <div>
      {decrypted && <p>Value: {decrypted.value}</p>}
      <button onClick={handleReveal} disabled={isDecrypting}>
        Reveal
      </button>
    </div>
  );
}
```

### `useFhevmContract(options)`

Get a contract instance with FHE support.

**Parameters:**
- `options: ContractOptions`
  - `address: string` - Contract address
  - `abi: any[]` - Contract ABI
  - `signerOrProvider: ethers.Signer | ethers.Provider`

**Returns:** `ethers.Contract`

**Example:**
```tsx
const contract = useFhevmContract({
  address: CONTRACT_ADDRESS,
  abi: contractABI,
  signerOrProvider: signer
});
```

### `useEncryptedState(contract, functionName, args?, options?)`

Watch encrypted state with automatic polling.

**Parameters:**
- `contract: ethers.Contract` - Contract instance
- `functionName: string` - Function name to call
- `args?: any[]` - Function arguments
- `options?: StateOptions`
  - `pollingInterval?: number` - Polling interval in ms (default: 5000)
  - `enabled?: boolean` - Enable/disable polling (default: true)

**Returns:** `UseEncryptedStateResult`
- `data: any`
- `isLoading: boolean`
- `error: Error | null`
- `refetch: () => Promise<void>`

**Example:**
```tsx
const stats = useEncryptedState(
  contract,
  'productStats',
  [productId],
  { pollingInterval: 5000 }
);
```

## Utility Functions

### `formatHandle(handle)`

Format an encrypted handle for display.

**Parameters:**
- `handle: string` - Handle to format

**Returns:** `string`

### `formatEther(wei)`

Format wei to ether string.

**Parameters:**
- `wei: bigint` - Wei amount

**Returns:** `string`

### `parseEther(ether)`

Parse ether string to wei.

**Parameters:**
- `ether: string` - Ether amount

**Returns:** `bigint`

### `isValidAddress(address)`

Validate Ethereum address format.

**Parameters:**
- `address: string` - Address to validate

**Returns:** `boolean`

## Type Definitions

### `FHEType`

Supported encryption types:
```typescript
type FHEType = 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256' | 'bool' | 'address';
```

### `FhevmConfig`

Configuration for FHEVM instance:
```typescript
interface FhevmConfig {
  chainId: number;
  rpcUrl: string;
  gatewayUrl?: string;
  aclAddress?: string;
}
```

### `EncryptedValue`

Encrypted data structure:
```typescript
interface EncryptedValue {
  data: string;
  type: FHEType;
  timestamp?: number;
}
```

### `DecryptedValue`

Decrypted data structure:
```typescript
interface DecryptedValue {
  value: string | number | boolean;
  type: FHEType;
  timestamp?: number;
}
```

For more examples and usage patterns, see the [examples directory](../examples/).
