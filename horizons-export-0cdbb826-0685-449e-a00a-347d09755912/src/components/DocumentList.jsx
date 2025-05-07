
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddDocumentDialog from '@/components/AddDocumentDialog';
import EditDocumentDialog from '@/components/EditDocumentDialog';
import DeleteDocumentDialog from '@/components/DeleteDocumentDialog';
import DocumentTable from '@/components/document/DocumentTable';
import DocumentFilters from '@/components/document/DocumentFilters';

const DocumentList = ({ 
  documents, 
  categories, 
  addDocument, 
  updateDocument, 
  deleteDocument,
  userRoles,
  currentUserRole
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [documentToEdit, setDocumentToEdit] = useState(null);
  const [documentToDelete, setDocumentToDelete] = useState(null);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? doc.category === selectedCategory : true;
    const matchesStatus = selectedStatus ? doc.status === selectedStatus : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const uniqueCategories = [...new Set(documents.map(doc => doc.category))];
  const uniqueStatuses = [...new Set(documents.map(doc => doc.status))];

  const handleEdit = (document) => {
    setDocumentToEdit(document);
  };

  const handleDelete = (document) => {
    setDocumentToDelete(document);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-slate-700">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-100">Manage Documents</h1>
        <Button 
          onClick={() => setShowAddDialog(true)}
          className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white shadow-md transition-all transform hover:scale-105"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Document
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
        <DocumentFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          uniqueCategories={uniqueCategories}
          uniqueStatuses={uniqueStatuses}
        />
        
        <DocumentTable
          documents={filteredDocuments}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <AddDocumentDialog 
        open={showAddDialog} 
        onOpenChange={setShowAddDialog}
        categories={uniqueCategories} 
        onAdd={addDocument}
        userRoles={userRoles}
        currentUserRole={currentUserRole}
      />
      
      {documentToEdit && (
        <EditDocumentDialog 
          document={documentToEdit}
          open={!!documentToEdit}
          onOpenChange={() => setDocumentToEdit(null)}
          categories={uniqueCategories}
          onUpdate={(updatedData) => {
            updateDocument(documentToEdit.id, updatedData);
            setDocumentToEdit(null);
          }}
          userRoles={userRoles}
          currentUserRole={currentUserRole}
        />
      )}
      
      {documentToDelete && (
        <DeleteDocumentDialog 
          document={documentToDelete}
          open={!!documentToDelete}
          onOpenChange={() => setDocumentToDelete(null)}
          onDelete={() => {
            deleteDocument(documentToDelete.id);
            setDocumentToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default DocumentList;
