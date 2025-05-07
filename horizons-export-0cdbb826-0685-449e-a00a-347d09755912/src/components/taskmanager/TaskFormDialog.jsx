
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const TaskFormDialog = ({ open, onOpenChange, onSubmit, task, projects, userRoles }) => {
  const [formData, setFormData] = useState({ name: '', projectId: '', status: 'Pending', dueDate: '', assignedTo: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({ ...task, projectId: task.projectId || '', assignedTo: task.assignedTo || '' });
    } else {
      setFormData({ name: '', projectId: '', status: 'Pending', dueDate: '', assignedTo: '' });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Task name is required.";
    if (!formData.projectId) newErrors.projectId = "Project is required.";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required.";
    if (!formData.assignedTo) newErrors.assignedTo = "Assigned role is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-white dark:bg-slate-800 rounded-lg shadow-xl">
        <DialogHeader className="pb-4 border-b border-gray-200 dark:border-slate-700">
          <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-slate-100">{task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Task Name</label>
            <input type="text" id="taskName" name="name" value={formData.name} onChange={handleChange} className={`w-full input-field ${errors.name ? 'border-red-500' : ''}`} />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="taskProject" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Project</label>
            <select id="taskProject" name="projectId" value={formData.projectId} onChange={handleChange} className={`w-full input-field ${errors.projectId ? 'border-red-500' : ''}`}>
              <option value="">Select Project</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            {errors.projectId && <p className="text-xs text-red-500 mt-1">{errors.projectId}</p>}
          </div>
          <div>
            <label htmlFor="taskStatus" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Status</label>
            <select id="taskStatus" name="status" value={formData.status} onChange={handleChange} className="w-full input-field">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label htmlFor="taskDueDate" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Due Date</label>
            <input type="date" id="taskDueDate" name="dueDate" value={formData.dueDate} onChange={handleChange} className={`w-full input-field ${errors.dueDate ? 'border-red-500' : ''}`} />
            {errors.dueDate && <p className="text-xs text-red-500 mt-1">{errors.dueDate}</p>}
          </div>
          <div>
            <label htmlFor="taskAssignedTo" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Assign To (Role)</label>
            <select id="taskAssignedTo" name="assignedTo" value={formData.assignedTo} onChange={handleChange} className={`w-full input-field ${errors.assignedTo ? 'border-red-500' : ''}`}>
              <option value="">Select Role</option>
              {userRoles.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
            {errors.assignedTo && <p className="text-xs text-red-500 mt-1">{errors.assignedTo}</p>}
          </div>
          <DialogFooter className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700">Cancel</Button>
            <Button type="submit" className="ml-2 btn-primary">{task ? 'Update Task' : 'Add Task'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default TaskFormDialog;
