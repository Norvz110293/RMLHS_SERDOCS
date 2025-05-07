
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Briefcase, ListChecks, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectFormDialog from '@/components/taskmanager/ProjectFormDialog';
import TaskFormDialog from '@/components/taskmanager/TaskFormDialog';
import ProjectList from '@/components/taskmanager/ProjectList';
import TaskList from '@/components/taskmanager/TaskList';
import TaskFilters from '@/components/taskmanager/TaskFilters';


const TaskManager = ({ tasks, projects, addTask, updateTask, deleteTask, addProject, updateProject, deleteProject, userRoles, currentUserRole }) => {
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProject, setFilterProject] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const handleAddProject = () => { setEditingProject(null); setShowProjectDialog(true); };
  const handleEditProject = (project) => { setEditingProject(project); setShowProjectDialog(true); };
  const handleProjectSubmit = (data) => {
    if (editingProject) {
      updateProject(editingProject.id, data);
    } else {
      addProject(data);
    }
    setShowProjectDialog(false);
  };
  
  const handleAddTask = () => { setEditingTask(null); setShowTaskDialog(true); };
  const handleEditTask = (task) => { setEditingTask(task); setShowTaskDialog(true); };
  const handleTaskSubmit = (data) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask(data);
    }
    setShowTaskDialog(false);
  };

  const filteredTasks = tasks.filter(task => {
    const projectDetails = projects.find(p => p.id === task.projectId);
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (projectDetails && projectDetails.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesProject = filterProject ? task.projectId === parseInt(filterProject) : true;
    const matchesStatus = filterStatus ? task.status === filterStatus : true;
    return matchesSearch && matchesProject && matchesStatus;
  });


  return (
    <div className="space-y-8 p-1">
      <style jsx>{`
        .input-field {
          @apply px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-sky-500;
        }
        .btn-primary {
          @apply bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white shadow-md transition-all transform hover:scale-105;
        }
      `}</style>
      <div className="flex flex-col md:flex-row items-center justify-between pb-4 border-b border-gray-200 dark:border-slate-700">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-4 md:mb-0">Task & Project Management</h1>
        <div className="flex space-x-3">
          <Button onClick={handleAddProject} className="btn-primary"><Briefcase className="h-5 w-5 mr-2" />Add Project</Button>
          <Button onClick={handleAddTask} className="btn-primary"><ListChecks className="h-5 w-5 mr-2" />Add Task</Button>
        </div>
      </div>

      <TaskFilters 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        filterProject={filterProject} setFilterProject={setFilterProject}
        filterStatus={filterStatus} setFilterStatus={setFilterStatus}
        projects={projects}
      />
      
      <ProjectList 
        projects={projects} 
        onEditProject={handleEditProject} 
        onDeleteProject={deleteProject} 
      />

      <TaskList 
        tasks={filteredTasks} 
        projects={projects}
        onEditTask={handleEditTask} 
        onDeleteTask={deleteTask} 
      />

      {showProjectDialog && <ProjectFormDialog open={showProjectDialog} onOpenChange={setShowProjectDialog} onSubmit={handleProjectSubmit} project={editingProject} userRoles={userRoles} />}
      {showTaskDialog && <TaskFormDialog open={showTaskDialog} onOpenChange={setShowTaskDialog} onSubmit={handleTaskSubmit} task={editingTask} projects={projects} userRoles={userRoles} />}
    </div>
  );
};

export default TaskManager;
