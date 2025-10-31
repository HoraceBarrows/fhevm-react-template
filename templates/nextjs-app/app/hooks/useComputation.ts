import { useState, useCallback } from 'react';

export type ComputationOperation =
  | 'add' | 'sub' | 'mul' | 'div'
  | 'eq' | 'ne' | 'lt' | 'lte' | 'gt' | 'gte'
  | 'and' | 'or' | 'xor' | 'not';

interface ComputationResult {
  handle: string;
  operation: ComputationOperation;
  type: string;
  timestamp: number;
}

/**
 * Hook for performing homomorphic computations on encrypted data
 */
export function useComputation() {
  const [result, setResult] = useState<ComputationResult | null>(null);
  const [isComputing, setIsComputing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const compute = useCallback(
    async (
      operation: ComputationOperation,
      operands: string[],
      type: string = 'uint32'
    ) => {
      setIsComputing(true);
      setError(null);

      try {
        // Validate operands
        if (!operands || operands.length < 1) {
          throw new Error('At least one operand is required');
        }

        if (operation !== 'not' && operands.length < 2) {
          throw new Error('At least two operands are required for this operation');
        }

        // Call the API endpoint
        const response = await fetch('/api/fhe/compute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operation,
            operands,
            type,
          }),
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Computation failed');
        }

        setResult(data.result);
        return data.result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Computation failed';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsComputing(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    compute,
    result,
    isComputing,
    error,
    reset,
  };
}

/**
 * Hook for chaining multiple homomorphic operations
 */
export function useComputationChain() {
  const [results, setResults] = useState<ComputationResult[]>([]);
  const [isComputing, setIsComputing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeChain = useCallback(
    async (
      operations: Array<{
        operation: ComputationOperation;
        operands: string[];
        type?: string;
      }>
    ) => {
      setIsComputing(true);
      setError(null);
      const chainResults: ComputationResult[] = [];

      try {
        for (const op of operations) {
          const response = await fetch('/api/fhe/compute', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              operation: op.operation,
              operands: op.operands,
              type: op.type || 'uint32',
            }),
          });

          const data = await response.json();

          if (!data.success) {
            throw new Error(data.error || 'Computation failed');
          }

          chainResults.push(data.result);
        }

        setResults(chainResults);
        return chainResults;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Computation chain failed';
        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setIsComputing(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return {
    executeChain,
    results,
    isComputing,
    error,
    reset,
  };
}
