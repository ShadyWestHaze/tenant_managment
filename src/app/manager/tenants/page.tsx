import TenantList from '../../../components/TenantList';

async function fetchTenants(baseUrl: string) {
  const res = await fetch(`${baseUrl}/api/tenants`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }

  return res.json();
}

export default async function TenantsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const tenants = await fetchTenants(baseUrl);

  return (
    <div className="tenants-page">
      <h1 className="text-3xl font-bold text-center mb-6">Tenants</h1>
      <TenantList tenants={tenants} />
    </div>
  );
}
