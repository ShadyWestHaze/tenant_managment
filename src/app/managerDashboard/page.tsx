import ManagerOverview from '../../components/ManagerOverview';

export default async function ManagerDashboard() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const apiUrl = `${baseUrl}/api/manager/dashboard`;
  const res = await fetch(apiUrl, {
    cache: 'no-store', 
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }

  const data = await res.json();
  const futureNoticesCount = data.notices.filter((notice: any) => new Date(notice.due_date) > new Date()).length;

  return (
    <div className="manager-dashboard">
   
      <main className="dashboard-main-content">
        <section id="overview" className="dashboard-section">
          <ManagerOverview
            tenantCount={data.tenantCount}
            pendingInvoicesCount={data.pendingInvoicesCount}
            noticesCount={futureNoticesCount} 
          />
        </section>

      </main>
    </div>
  );
}
