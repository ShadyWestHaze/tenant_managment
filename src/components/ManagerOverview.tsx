import Card from './Card';
import Link from 'next/link';

interface ManagerOverviewProps {
  tenantCount: number;
  pendingInvoicesCount: number;
  noticesCount: number; 
}

export default function ManagerOverview({
  tenantCount,
  pendingInvoicesCount,
  noticesCount, 
}: ManagerOverviewProps) {
  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold text-center mb-4">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/manager/tenants" className="dark:bg-gray-900 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out transform hover:scale-105">
          <Card title="Total Tenants" value={tenantCount} />
        </Link>
        <Link href="/manager/invoices" className="dark:bg-gray-900 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out transform hover:scale-105">
          <Card title="Pending Invoices" value={pendingInvoicesCount} />
        </Link>
        <Link href="/manager/notices" className="dark:bg-gray-900 text-white shadow-lg rounded-lg p-6 text-center transition duration-300 ease-in-out transform hover:scale-105">
          <Card title="Notices" value={noticesCount} />
        </Link>
      </div>
    </div>
  );
}
