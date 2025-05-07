
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const ProjectFormDialog = ({ open, onOpenChange, onSubmit, project, userRoles }) => {
  const [formData, setFormData] = useState({ name: '', description: '', status: 'Planning', assignedTo: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (project) {
      setFormData({ ...project, assignedTo: project.assignedTo || '' });
    } else {
      setFormData({ name: '', description: '', status: 'Planning', assignedTo: '' });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Project name is required.";
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
          <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-slate-100">{project ? 'Edit Project' : 'Add New Project'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Project Name</label>
            <input type="text" id="projectName" name="name" value={formData.name} onChange={handleChange} className={`w-full input-field ${errors.name ? 'border-red-500' : ''}`} />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Description</label>
            <textarea id="projectDescription" name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full input-field"></textarea>
          </div>
          <div>
            <label htmlFor="projectStatus" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Status</label>
            <select id="projectStatus" name="status" value={formData.status} onChange={handleChange} className="w-full input-field">
              <option value="Planning">Planning</option>
              <option value="Active">Active</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
           <div>
            <label htmlFor="projectAssignedTo" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Assign To (Role)</label>
            <select id="projectAssignedTo" name="assignedTo" value={formData.assignedTo} onChange={handleChange} className={`w-full input-field ${errors.assignedTo ? 'border-red-500' : ''}`}>
              <option value="">Select Role</option>
              {userRoles.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
            {errors.assignedTo && <p className="text-xs text-red-500 mt-1">{errors.assignedTo}</p>}
          </div>
          <DialogFooter className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700">Cancel</Button>
            <Button type="submit" className="ml-2 btn-primary">{project ? 'Update Project' : 'Add Project'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default ProjectFormDialog;
