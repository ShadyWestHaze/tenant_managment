"use client";

import { useState } from 'react';

interface Notice {
  id: number;
  title: string;
  content: string;
  created_at: string;
  due_date: string;
}

interface NoticeListProps {
  notices: Notice[];
}

export default function NoticeList({ notices }: NoticeListProps) {
  const [sortKey, setSortKey] = useState<string>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showPastNotices, setShowPastNotices] = useState<boolean>(false);

  const sortNotices = (notices: Notice[]) => {
    return notices.slice().sort((a, b) => {
      let comparison = 0;
      switch (sortKey) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'created_at':
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case 'due_date':
          comparison = new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  const filterNotices = (notices: Notice[]) => {
    const now = new Date();
    return showPastNotices 
      ? notices 
      : notices.filter(notice => new Date(notice.due_date) > now);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
  };

  const sortedNotices = sortNotices(notices);
  const filteredNotices = filterNotices(sortedNotices);

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <div className="mb-4 flex space-x-2">
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="title">Title</option>
          <option value="created_at">Created Date</option>
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
            checked={showPastNotices}
            onChange={() => setShowPastNotices(!showPastNotices)}
            className="form-checkbox"
          />
          <span>{showPastNotices ? 'Showing All Notices' : 'Include Past Notices'}</span>
        </label>
      </div>

      {filteredNotices.length === 0 ? (
        <p>No notices available.</p>
      ) : (
        filteredNotices.map((notice) => (
          <div
            key={notice.id}
            className="w-full max-w-md bg-white border border-gray-300 rounded-lg p-4 transition-all duration-300 hover:border-blue-500 hover:shadow-xl"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold">{notice.title}</h3>
              <p className="text-gray-600 mt-2">{notice.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Created At: {formatDate(notice.created_at)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Due Date: {formatDate(notice.due_date)}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
