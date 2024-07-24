"use client"
import { useState } from 'react';

interface Tenant {
  name: string;
  lastname: string;
  email: string;
  ismanager: boolean;
}

interface TenantListProps {
  tenants: Tenant[];
}

export default function TenantList({ tenants }: TenantListProps) {
  const [sortKey, setSortKey] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const sortTenants = (tenants: Tenant[]) => {
    return tenants.slice().sort((a, b) => {
      let comparison = 0;
      switch (sortKey) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'lastname':
          comparison = a.lastname.localeCompare(b.lastname);
          break;
        case 'email':
          comparison = a.email.localeCompare(b.email);
          break;
        case 'ismanager':
          comparison = Number(a.ismanager) - Number(b.ismanager);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  const sortedTenants = sortTenants(tenants);

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <div className="mb-4 flex space-x-2">
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="name">Name</option>
          <option value="lastname">Lastname</option>
          <option value="email">Email</option>
          <option value="ismanager">Is Manager</option>
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="p-2 border border-gray-300 rounded bg-blue-500 text-white"
        >
          Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
        </button>
      </div>

      {sortedTenants.map((tenant, index) => (
        <div
          key={index}
          className="w-full max-w-md bg-white border border-gray-300 rounded-lg p-4 transition-all duration-300 hover:border-blue-500 hover:shadow-xl"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold">{tenant.name} {tenant.lastname}</h3>
            <p className="text-gray-600">{tenant.email}</p>
            <p className={`mt-2 ${tenant.ismanager ? 'text-green-600' : 'text-red-600'}`}>
              <strong>Is Manager:</strong> {tenant.ismanager ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

  