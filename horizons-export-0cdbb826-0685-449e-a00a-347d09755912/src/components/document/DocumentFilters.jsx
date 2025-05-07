
import React from 'react';
import { Search, Filter } from 'lucide-react';

const DocumentFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  uniqueCategories,
  uniqueStatuses
}) => {
  return (
    <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 items-center bg-gray-50 dark:bg-slate-800/50">
      <div className="relative flex-1 w-full sm:w-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 dark:text-slate-500" />
        </div>
        <input
          type="text"
          placeholder="Search documents..."
          className="pl-10 pr-4 py-2.5 w-full border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-sky-500 focus:border-blue-500 dark:focus:border-sky-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="flex gap-3 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-none">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-gray-400 dark:text-slate-500" />
          </div>
          <select
            className="pl-10 pr-4 py-2.5 w-full border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-sky-500 focus:border-blue-500 dark:focus:border-sky-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 appearance-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <select
          className="px-4 py-2.5 w-full sm:w-auto border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-sky-500 focus:border-blue-500 dark:focus:border-sky-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 appearance-none"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          {uniqueStatuses.map((status, index) => (
            <option key={index} value={status}>{status}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DocumentFilters;
