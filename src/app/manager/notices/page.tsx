import NoticeList from '../../../components/NoticeList';

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
  return data.notices;
}

export default async function NoticesPage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const notices = await fetchDashboardData(baseUrl);

  return (
    <div className="notices-page">
      <h1 className="text-3xl font-bold text-center mb-6">Notices</h1>
      <NoticeList notices={notices} />
    </div>
  );
}
