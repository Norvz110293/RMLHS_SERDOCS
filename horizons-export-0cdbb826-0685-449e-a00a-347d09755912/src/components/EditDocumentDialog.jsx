
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const EditDocumentDialog = ({ document, open, onOpenChange, categories, onUpdate, userRoles, currentUserRole }) => {
  const [formData, setFormData] = useState({ name: '', category: '', status: '', assignedTo: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (document) {
      setFormData({
        name: document.name,
        category: document.category,
        status: document.status,
        assignedTo: document.assignedTo || currentUserRole || '',
      });
    }
  }, [document, currentUserRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Document name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.assignedTo) newErrors.assignedTo = 'Assigned user role is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdate(formData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-white dark:bg-slate-800 rounded-lg shadow-xl">
        <DialogHeader className="pb-4 border-b border-gray-200 dark:border-slate-700">
          <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-slate-100">Edit Document</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Document Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 dark:focus:ring-sky-500'}`} />
            {errors.name && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-xs text-red-500">{errors.name}</motion.p>}
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Category</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600 appearance-none ${errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 dark:focus:ring-sky-500'}`}>
              <option value="">Select a category</option>
              {categories.map((category, index) => (<option key={index} value={category}>{category}</option>))}
            </select>
            {errors.category && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-xs text-red-500">{errors.category}</motion.p>}
          </div>

          <div>
            <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Assign To (Role)</label>
            <select id="assignedTo" name="assignedTo" value={formData.assignedTo} onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600 appearance-none ${errors.assignedTo ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 dark:focus:ring-sky-500'}`}>
              <option value="">Select a role</option>
              {userRoles.map((role, index) => (<option key={index} value={role}>{role}</option>))}
            </select>
            {errors.assignedTo && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-xs text-red-500">{errors.assignedTo}</motion.p>}
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-sky-500 dark:bg-slate-700 dark:text-slate-100 appearance-none">
              <option value="Available">Available</option>
              <option value="Needs Signature">Needs Signature</option>
            </select>
          </div>
          
          <DialogFooter className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700">Cancel</Button>
            <Button type="submit" className="ml-2 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white shadow-md">Update Document</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDocumentDialog;
