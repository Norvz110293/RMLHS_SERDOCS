
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ListChecks } from 'lucide-react';

const TaskList = ({ tasks, projects, onEditTask, onDeleteTask }) => {
  const getProjectName = (projectId) => projects.find(p => p.id === projectId)?.name || 'N/A';

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };
  
  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-slate-200 mb-4 flex items-center">
        <ListChecks className="mr-3 text-green-600 dark:text-emerald-500" />Tasks
      </h2>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                <th className="th-cell">Task Name</th>
                <th className="th-cell">Project</th>
                <th className="th-cell">Status</th>
                <th className="th-cell">Due Date</th>
                <th className="th-cell">Assigned To</th>
                <th className="th-cell text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
              <AnimatePresence>
              {tasks.map(task => (
                <motion.tr 
                  key={task.id} 
                  variants={itemVariants} 
                  initial="hidden" 
                  animate="visible" 
                  exit="exit" 
                  className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <td className="td-cell font-medium text-gray-900 dark:text-slate-100">{task.name}</td>
                  <td className="td-cell">{getProjectName(task.projectId)}</td>
                  <td className="td-cell">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      task.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' :
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' :
                      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300'}`}>{task.status}</span>
                  </td>
                  <td className="td-cell">{task.dueDate}</td>
                  <td className="td-cell">{task.assignedTo || 'N/A'}</td>
                  <td className="td-cell text-right">
                    <Button variant="ghost" size="sm" onClick={() => onEditTask(task)} className="mr-2 text-blue-600 hover:text-blue-800 dark:text-sky-400 dark:hover:text-sky-300"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => onDeleteTask(task.id)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"><Trash2 className="h-4 w-4" /></Button>
                  </td>
                </motion.tr>
              ))}
              </AnimatePresence>
            </tbody>
          </table>
          {tasks.length === 0 && <p className="text-center text-gray-500 dark:text-slate-400 py-8">No tasks match your filters, or no tasks have been added yet.</p>}
        </div>
      </div>
    </section>
  );
};
export default TaskList;
