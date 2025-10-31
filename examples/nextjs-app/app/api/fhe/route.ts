import { NextRequest, NextResponse } from 'next/server';

/**
 * FHE Operations API Route
 * Handles general FHE operations and information
 */
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      message: 'FHE API is running',
      endpoints: {
        encrypt: '/api/fhe/encrypt',
        decrypt: '/api/fhe/decrypt',
        compute: '/api/fhe/compute',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { operation, data } = body;

    if (!operation) {
      return NextResponse.json(
        { success: false, error: 'Operation type required' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Operation ${operation} received`,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
