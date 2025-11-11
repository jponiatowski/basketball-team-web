import { esorClient } from '@/base/lib/esor/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const seasons = await esorClient.getAllSeasons();

  return NextResponse.json(seasons);
}
