import { NextRequest, NextResponse } from 'next/server';

/**
 * Encryption API Route
 * Handles encryption of values using FHE
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { value, type = 'uint32' } = body;

    if (value === undefined || value === null) {
      return NextResponse.json(
        { success: false, error: 'Value is required for encryption' },
        { status: 400 }
      );
    }

    // Validate encryption type
    const validTypes = ['uint8', 'uint16', 'uint32', 'uint64', 'bool', 'address'];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid type. Must be one of: ${validTypes.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // In a real implementation, this would use the FHEVM SDK
    // For now, we return a mock encrypted value
    const mockEncrypted = {
      data: `0x${Buffer.from(String(value)).toString('hex')}`,
      type,
      timestamp: Date.now(),
    };

    return NextResponse.json({
      success: true,
      encrypted: mockEncrypted,
      message: `Value encrypted as ${type}`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Encryption failed',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    endpoint: '/api/fhe/encrypt',
    method: 'POST',
    description: 'Encrypt values using FHE',
    parameters: {
      value: 'The value to encrypt (required)',
      type: 'Encryption type: uint8, uint16, uint32, uint64, bool, address (default: uint32)',
    },
  });
}
