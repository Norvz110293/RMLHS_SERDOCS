
import React from 'react';
import { Search, Filter } from 'lucide-react';

const TaskFilters = ({ 
  searchTerm, setSearchTerm, 
  filterProject, setFilterProject, 
  filterStatus, setFilterStatus, 
  projects 
}) => {
  return (
    <div className="p-5 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 items-center">
      <div className="relative flex-1 w-full md:w-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-slate-500" />
        <input 
          type="text" 
          placeholder="Search tasks or projects..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="pl-10 input-field w-full" 
        />
      </div>
      <div className="relative flex-1 w-full md:w-auto">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-slate-500" />
        <select 
          value={filterProject} 
          onChange={(e) => setFilterProject(e.target.value)} 
          className="pl-10 input-field w-full appearance-none"
        >
          <option value="">All Projects</option>
          {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      <select 
        value={filterStatus} 
        onChange={(e) => setFilterStatus(e.target.value)} 
        className="input-field w-full md:w-auto appearance-none"
      >
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};
export default TaskFilters;
