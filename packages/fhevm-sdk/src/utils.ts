/**
 * Utility functions for FHEVM SDK
 */

/**
 * Convert BigInt to hex string
 */
export function bigIntToHex(value: bigint): string {
  return '0x' + value.toString(16);
}

/**
 * Convert hex string to BigInt
 */
export function hexToBigInt(hex: string): bigint {
  return BigInt(hex);
}

/**
 * Format encrypted handle for display
 */
export function formatHandle(handle: string): string {
  if (handle.length <= 10) return handle;
  return `${handle.slice(0, 6)}...${handle.slice(-4)}`;
}

/**
 * Check if an address is valid
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Format wei to ether string
 */
export function formatEther(wei: bigint, decimals: number = 4): string {
  const ether = Number(wei) / 1e18;
  return ether.toFixed(decimals);
}

/**
 * Parse ether string to wei
 */
export function parseEther(ether: string): bigint {
  const value = parseFloat(ether) * 1e18;
  return BigInt(Math.floor(value));
}

/**
 * Sleep for specified milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    retries?: number;
    delay?: number;
    backoff?: number;
  } = {}
): Promise<T> {
  const { retries = 3, delay = 1000, backoff = 2 } = options;

  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await sleep(delay * Math.pow(backoff, i));
    }
  }

  throw new Error('Retry failed');
}

/**
 * Chunk an array into smaller arrays
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Convert product category enum to string
 */
export function formatCategory(category: number): string {
  const categories = ['FOOTWEAR', 'CLOTHING', 'EQUIPMENT', 'ACCESSORIES', 'FITNESS'];
  return categories[category] || 'UNKNOWN';
}

/**
 * Convert order status enum to string
 */
export function formatOrderStatus(status: number): string {
  const statuses = ['PENDING', 'COLLECTING', 'PROCESSING', 'COMPLETED', 'CANCELLED'];
  return statuses[status] || 'UNKNOWN';
}

/**
 * Get color for order status
 */
export function getStatusColor(status: number): string {
  const colors = ['yellow', 'blue', 'orange', 'green', 'red'];
  return colors[status] || 'gray';
}

/**
 * Format timestamp to readable date
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString();
}

/**
 * Check if deadline has passed
 */
export function isExpired(deadline: number): boolean {
  return Date.now() / 1000 > deadline;
}

/**
 * Get time remaining until deadline
 */
export function getTimeRemaining(deadline: number): string {
  const now = Date.now() / 1000;
  const remaining = deadline - now;

  if (remaining <= 0) return 'Expired';

  const days = Math.floor(remaining / 86400);
  const hours = Math.floor((remaining % 86400) / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
