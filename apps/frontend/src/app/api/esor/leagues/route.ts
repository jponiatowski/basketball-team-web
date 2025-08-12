import { esorClient } from '@/base/lib/esor/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const leagues = await esorClient.getAllLeagues();

    return NextResponse.json(leagues);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
