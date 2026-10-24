'use client';

import React from 'react';
import { Search } from 'lucide-react';

export function ReviewFilters({
  searchQuery,
  setSearchQuery,
  selectedPlatform,
  setSelectedPlatform,
  selectedStatus,
  setSelectedStatus,
}) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search reviews by customer name or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-slate-200"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm bg-white border-slate-200 text-slate-700"
        >
          <option value="all">All Platforms</option>
          <option value="google">Google</option>
          <option value="yelp">Yelp</option>
          <option value="facebook">Facebook</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 border rounded-lg text-sm bg-white border-slate-200 text-slate-700"
        >
          <option value="all">All Statuses</option>
          <option value="unreplied">Pending Reply</option>
          <option value="replied">Replied</option>
        </select>
      </div>
    </div>
  );
}