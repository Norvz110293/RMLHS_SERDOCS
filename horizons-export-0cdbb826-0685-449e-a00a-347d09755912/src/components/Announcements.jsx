
import React, { useState, useEffect } from 'react';
import { Megaphone, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const AnnouncementFormDialog = ({ open, onOpenChange, onSubmit, announcement }) => {
  const [formData, setFormData] = useState(announcement || { title: '', content: '', date: new Date().toISOString().split('T')[0] });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (announcement) {
      setFormData({ ...announcement, date: announcement.date || new Date().toISOString().split('T')[0] });
    } else {
      setFormData({ title: '', content: '', date: new Date().toISOString().split('T')[0] });
    }
  }, [announcement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.content.trim()) newErrors.content = "Content is required.";
    if (!formData.date) newErrors.date = "Date is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-white dark:bg-slate-800 rounded-lg shadow-xl">
        <DialogHeader className="pb-4 border-b border-gray-200 dark:border-slate-700">
          <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-slate-100">{announcement ? 'Edit Announcement' : 'Add New Announcement'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <label htmlFor="announcementTitle" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Title</label>
            <input type="text" id="announcementTitle" name="title" value={formData.title} onChange={handleChange} className={`w-full input-field ${errors.title ? 'border-red-500' : ''}`} />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>
          <div>
            <label htmlFor="announcementContent" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Content</label>
            <textarea id="announcementContent" name="content" value={formData.content} onChange={handleChange} rows="4" className={`w-full input-field ${errors.content ? 'border-red-500' : ''}`}></textarea>
            {errors.content && <p className="text-xs text-red-500 mt-1">{errors.content}</p>}
          </div>
          <div>
            <label htmlFor="announcementDate" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Date</label>
            <input type="date" id="announcementDate" name="date" value={formData.date} onChange={handleChange} className={`w-full input-field ${errors.date ? 'border-red-500' : ''}`} />
            {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
          </div>
          <DialogFooter className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700">Cancel</Button>
            <Button type="submit" className="ml-2 btn-primary">{announcement ? 'Update Announcement' : 'Add Announcement'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};


const Announcements = ({ announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement, currentUserRole, USER_ROLES }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  const handleAdd = () => { setEditingAnnouncement(null); setShowDialog(true); };
  const handleEdit = (announcement) => { setEditingAnnouncement(announcement); setShowDialog(true); };
  const handleSubmit = (data) => {
    if (editingAnnouncement) {
      updateAnnouncement(editingAnnouncement.id, data);
    } else {
      addAnnouncement(data);
    }
  };

  const canManage = currentUserRole === USER_ROLES.PRINCIPAL || currentUserRole === USER_ROLES.ADMIN_STAFF;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <div className="space-y-8 p-1">
       <style jsx>{`
        .input-field { @apply px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-sky-500; }
        .btn-primary { @apply bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white shadow-md transition-all transform hover:scale-105; }
      `}</style>
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-slate-700">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-100 flex items-center">
          <Megaphone className="mr-3 h-8 w-8 text-amber-500" />
          Announcements & News
        </h1>
        {canManage && (
          <Button onClick={handleAdd} className="btn-primary">
            <Plus className="h-5 w-5 mr-2" /> Add Announcement
          </Button>
        )}
      </div>

      {announcements.length === 0 && (
        <p className="text-center text-gray-500 dark:text-slate-400 py-10">No announcements yet.</p>
      )}

      <div className="space-y-6">
        <AnimatePresence>
          {announcements.sort((a,b) => new Date(b.date) - new Date(a.date)).map(announcement => (
            <motion.div
              key={announcement.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-blue-600 dark:text-sky-400 mb-1">{announcement.title}</h2>
                  <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">Posted on: {new Date(announcement.date).toLocaleDateString()}</p>
                </div>
                {canManage && (
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(announcement)} className="text-blue-600 hover:text-blue-800 dark:text-sky-400 dark:hover:text-sky-300">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteAnnouncement(announcement.id)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-gray-700 dark:text-slate-300 whitespace-pre-wrap">{announcement.content}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {showDialog && (
        <AnnouncementFormDialog
          open={showDialog}
          onOpenChange={setShowDialog}
          onSubmit={handleSubmit}
          announcement={editingAnnouncement}
        />
      )}
    </div>
  );
};

export default Announcements;
