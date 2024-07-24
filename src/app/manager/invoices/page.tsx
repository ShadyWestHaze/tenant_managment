import InvoiceList from '../../../components/InvoiceList';

async function fetchDashboardData(baseUrl: string) {
  const res = await fetch(`${baseUrl}/api/manager/dashboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    console.error('Failed to fetch dashboard data:', res.statusText);
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }

  const data = await res.json();
  return data.invoices;
}

export default async function InvoicesPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const invoices = await fetchDashboardData(baseUrl);

  return (
    <div className="invoices-page">
      <h1 className="text-3xl font-bold text-center mb-6">Invoices</h1>
      <InvoiceList invoices={invoices} />
    </div>
  );
}
