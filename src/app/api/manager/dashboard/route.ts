import { NextResponse } from 'next/server';
import { getTenantCount, getPendingInvoicesCount, getNotices, getInvoices  } from '../../../lib/db';

export async function GET() {
  try {
    const tenantCount = await getTenantCount();
    const pendingInvoicesCount = await getPendingInvoicesCount();
    const notices = await getNotices();
    const invoices = await getInvoices();

    return NextResponse.json({
      tenantCount,
      pendingInvoicesCount,
      notices,
      invoices,

    });
  } catch (error) {
    console.error('Error fetching dashboard data', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
