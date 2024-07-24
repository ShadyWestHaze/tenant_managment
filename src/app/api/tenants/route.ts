import { NextRequest, NextResponse } from 'next/server';
import { getTenants } from '../../lib/db';

export async function GET(request: NextRequest) {
  try {
    const tenants = await getTenants();
    return NextResponse.json(tenants);
  } catch (error) {
    console.error('Error fetching tenants:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
