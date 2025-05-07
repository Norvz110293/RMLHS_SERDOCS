
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

const DeleteDocumentDialog = ({ document, open, onOpenChange, onDelete }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-slate-800 rounded-lg shadow-xl">
        <DialogHeader className="pb-4 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
            <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-slate-100">Delete Document</DialogTitle>
          </div>
        </DialogHeader>
        <DialogDescription className="mt-4 text-gray-600 dark:text-slate-300">
          Are you sure you want to delete "{document?.name}"? This action cannot be undone and will permanently remove the document.
        </DialogDescription>
        
        <DialogFooter className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-700">
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={onDelete}
            className="ml-2"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDocumentDialog;
