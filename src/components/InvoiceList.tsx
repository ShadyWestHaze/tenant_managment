"use client";
import { useState } from 'react';

interface Invoice {
  id: number;
  user_id: number;
  name: string;
  lastname: string;
  amount: number;
  due_date: string;
  is_paid: boolean;
}

interface InvoiceListProps {
  invoices: Invoice[];
}

export default function InvoiceList({ invoices }: InvoiceListProps) {
  const [sortKey, setSortKey] = useState<string>('due_date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showPaidInvoices, setShowPaidInvoices] = useState<boolean>(false);

  const sortInvoices = (invoices: Invoice[]) => {
    return invoices.slice().sort((a, b) => {
      let comparison = 0;
      switch (sortKey) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'due_date':
          comparison = new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  const filterInvoices = (invoices: Invoice[]) => {
    return showPaidInvoices ? invoices : invoices.filter(invoice => !invoice.is_paid);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
  };

  const sortedInvoices = sortInvoices(invoices);
  const filteredInvoices = filterInvoices(sortedInvoices);

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <div className="mb-4 flex space-x-2">
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="name">Name</option>
          <option value="amount">Amount</option>
          <option value="due_date">Due Date</option>
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="p-2 border border-gray-300 rounded bg-blue-500 text-white"
        >
          {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
        </button>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showPaidInvoices}
            onChange={() => setShowPaidInvoices(!showPaidInvoices)}
            className="form-checkbox"
          />
          <span>{showPaidInvoices ? 'Showing All Invoices' : 'Include Paid Invoices'}</span>
        </label>
      </div>

      {filteredInvoices.length === 0 ? (
        <p>No invoices available.</p>
      ) : (
        filteredInvoices.map((invoice) => (
          <div
            key={invoice.id}
            className="w-full max-w-md bg-white border border-gray-300 rounded-lg p-4 transition-all duration-300 hover:border-blue-500 hover:shadow-xl"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold">{invoice.name} {invoice.lastname}</h3>
              <p className="text-gray-600 mt-2">Amount: ${invoice.amount}</p>
              <p className="text-sm text-gray-500 mt-2">
                Due Date: {formatDate(invoice.due_date)}
              </p>
              <p className={`text-sm mt-1 ${invoice.is_paid ? 'text-green-500' : 'text-red-500'}`}>
                {invoice.is_paid ? 'Paid' : 'Pending'}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
