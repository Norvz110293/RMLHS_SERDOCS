
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Briefcase } from 'lucide-react';

const ProjectList = ({ projects, onEditProject, onDeleteProject }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-slate-200 mb-4 flex items-center">
        <Briefcase className="mr-3 text-blue-600 dark:text-sky-500" />Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {projects.map(project => (
            <motion.div 
              key={project.id} 
              variants={itemVariants} 
              initial="hidden" 
              animate="visible" 
              exit="exit" 
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-sky-400">{project.name}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  project.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' :
                  project.status === 'Planning' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' :
                  project.status === 'On Hold' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300' :
                  'bg-gray-100 text-gray-700 dark:bg-gray-900/50 dark:text-gray-300'
                }`}>{project.status}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-2 h-10 overflow-hidden line-clamp-2">{project.description}</p>
              <p className="text-xs text-gray-500 dark:text-slate-500 mb-4">Assigned to: {project.assignedTo || 'N/A'}</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEditProject(project)} className="dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700"><Edit className="h-4 w-4 mr-1" />Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => onDeleteProject(project.id)}><Trash2 className="h-4 w-4 mr-1" />Delete</Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {projects.length === 0 && <p className="text-center text-gray-500 dark:text-slate-400 py-4">No projects yet. Add one to get started!</p>}
    </section>
  );
};
export default ProjectList;
