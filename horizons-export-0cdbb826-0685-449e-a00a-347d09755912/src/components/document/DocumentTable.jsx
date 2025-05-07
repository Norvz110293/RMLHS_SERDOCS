
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MoreVertical, Edit, Trash2, Download, FileSignature, ShieldCheck } from 'lucide-react'; // Added ShieldCheck for PNPKI
import { useToast } from '@/components/ui/use-toast';

const DocumentTable = ({ documents, onEdit, onDelete }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { toast } = useToast();

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleEditClick = (document) => {
    onEdit(document);
    setActiveDropdown(null);
  };

  const handleDeleteClick = (document) => {
    onDelete(document);
    setActiveDropdown(null);
  };

  const handlePnpkiSign = (document) => {
    // Placeholder for PNPKI signing logic
    toast({
      title: "PNPKI Signature",
      description: `PNPKI signing process for "${document.name}" would be initiated here. This feature requires backend integration.`,
      variant: "info",
    });
    setActiveDropdown(null);
  };


  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
        <thead className="bg-gray-50 dark:bg-slate-700/50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Date</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Assigned To</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
          <AnimatePresence>
            {documents.map((document) => (
              <motion.tr 
                key={document.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
                className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-slate-100">{document.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-slate-400">{document.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    document.status === 'Available' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                  }`}>
                    {document.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-400">
                  {document.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-slate-400">
                  {document.assignedTo || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="relative inline-block text-left">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
                      onClick={() => toggleDropdown(document.id)}
                    >
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                    
                    <AnimatePresence>
                    {activeDropdown === document.id && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-xl bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 dark:ring-slate-700 z-10"
                      >
                        <div className="py-1" role="menu" aria-orientation="vertical">
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                            onClick={() => handleEditClick(document)}
                          >
                            <Edit className="h-4 w-4 mr-3 text-blue-500" />
                            Edit
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                            onClick={() => handleDeleteClick(document)}
                          >
                            <Trash2 className="h-4 w-4 mr-3" />
                            Delete
                          </button>
                          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700">
                            <Download className="h-4 w-4 mr-3 text-green-500" />
                            Download
                          </button>
                          <button 
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                            onClick={() => handlePnpkiSign(document)}
                          >
                            <ShieldCheck className="h-4 w-4 mr-3 text-teal-500" />
                            Sign with PNPKI
                          </button>
                          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700">
                            <FileSignature className="h-4 w-4 mr-3 text-purple-500" />
                            E-Sign (Generic)
                          </button>
                        </div>
                      </motion.div>
                    )}
                    </AnimatePresence>
                  </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
          
          {documents.length === 0 && (
            <tr>
              <td colSpan="6" className="px-6 py-10 text-center text-sm text-gray-500 dark:text-slate-400">
                No documents found. Try adjusting your filters or add a new document.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;
