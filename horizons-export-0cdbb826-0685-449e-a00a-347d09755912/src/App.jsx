
import React, { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import DocumentList from '@/components/DocumentList';
import TaskManager from '@/components/TaskManager';
import ReportGenerator from '@/components/ReportGenerator';
import AISuggestions from '@/components/AISuggestions';
import Announcements from '@/components/Announcements';
import PlaceholderPage from '@/components/PlaceholderPage';
import { motion } from 'framer-motion';
import { UserCircle } from 'lucide-react';
import { USER_ROLES, initialDocuments, initialCategories, initialTasks, initialProjects, initialAnnouncements } from '@/lib/data';
import { loadDataFromLocalStorage, saveDataToLocalStorage } from '@/lib/localStorageManager';

function App() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [documents, setDocuments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const [currentUser, setCurrentUser] = useState({ name: 'John Doe', role: USER_ROLES.PRINCIPAL, avatar: <UserCircle className="h-8 w-8 text-white" /> });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAllData = () => {
      try {
        setDocuments(loadDataFromLocalStorage('documents', initialDocuments));
        setCategories(loadDataFromLocalStorage('categories', initialCategories));
        setTasks(loadDataFromLocalStorage('tasks', initialTasks));
        setProjects(loadDataFromLocalStorage('projects', initialProjects));
        setAnnouncements(loadDataFromLocalStorage('announcements', initialAnnouncements));
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: 'Error Loading Data',
          description: 'Failed to load data from storage. Using defaults.',
          variant: 'destructive',
        });
        setDocuments(initialDocuments);
        setCategories(initialCategories);
        setTasks(initialTasks);
        setProjects(initialProjects);
        setAnnouncements(initialAnnouncements);
        setIsLoading(false);
      }
    };
    
    loadAllData();
    
    setTimeout(() => {
      toast({
        title: `Welcome, ${currentUser.name}!`,
        description: `You are logged in as ${currentUser.role}. Your system is ready.`,
      });
    }, 1000);
  }, [toast, currentUser.name, currentUser.role]);

  const createCrudHandlers = (state, setState, itemName, storageKey) => ({
    add: (item) => {
      const newItem = {
        id: state.length > 0 ? Math.max(...state.map(i => i.id)) + 1 : 1,
        ...item,
        date: item.date || new Date().toISOString().split('T')[0],
        createdDate: item.createdDate || new Date().toISOString().split('T')[0],
      };
      const updatedState = [...state, newItem];
      setState(updatedState);
      saveDataToLocalStorage(storageKey, updatedState);
      toast({ title: `${itemName} Added`, description: `${item.name || 'Item'} has been added.` });
    },
    update: (id, updatedData) => {
      const updatedState = state.map(item => item.id === id ? { ...item, ...updatedData } : item);
      setState(updatedState);
      saveDataToLocalStorage(storageKey, updatedState);
      toast({ title: `${itemName} Updated`, description: `${itemName} has been updated.` });
    },
    delete: (id) => {
      const itemToDelete = state.find(item => item.id === id);
      const updatedState = state.filter(item => item.id !== id);
      setState(updatedState);
      saveDataToLocalStorage(storageKey, updatedState);
      toast({ title: `${itemName} Deleted`, description: `${itemToDelete?.name || 'Item'} has been deleted.` });
      if (itemName === 'Project') { // Cascade delete tasks if a project is deleted
        const updatedTasks = tasks.filter(task => task.projectId !== id);
        setTasks(updatedTasks);
        saveDataToLocalStorage('tasks', updatedTasks);
      }
    },
  });

  const documentHandlers = createCrudHandlers(documents, setDocuments, 'Document', 'documents');
  const taskHandlers = createCrudHandlers(tasks, setTasks, 'Task', 'tasks');
  const projectHandlers = createCrudHandlers(projects, setProjects, 'Project', 'projects');
  const announcementHandlers = createCrudHandlers(announcements, setAnnouncements, 'Announcement', 'announcements');

  const getCompletedDocumentsPercentage = () => {
    if (documents.length === 0) return 0;
    const completed = documents.filter(doc => doc.status === 'Available').length;
    return Math.round((completed / documents.length) * 100);
  };

  const getPendingDocumentsCount = () => {
    return documents.filter(doc => doc.status === 'Needs Signature').length;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-xl font-semibold text-primary">Loading RMLHS-SERDOCS...</div>
      </div>
    );
  }
  
  const renderActiveTab = () => {
    switch(activeTab) {
      case 'dashboard':
        return <Dashboard 
                  documents={documents} tasks={tasks} projects={projects} announcements={announcements}
                  completedPercentage={getCompletedDocumentsPercentage()}
                  pendingCount={getPendingDocumentsCount()}
                  lateCount={documents.filter(doc => new Date(doc.date) < new Date() && doc.status !== 'Available').length}
                  aiSuggestionsCount={4} currentUser={currentUser} setActiveTab={setActiveTab} />;
      case 'documents':
        return <DocumentList 
                  documents={documents.filter(doc => currentUser.role === USER_ROLES.PRINCIPAL || doc.assignedTo === currentUser.role || !doc.assignedTo)}
                  categories={categories.find(c => c.name !== 'Tasks & Projects')?.subcategories || []}
                  addDocument={documentHandlers.add} updateDocument={documentHandlers.update} deleteDocument={documentHandlers.delete}
                  userRoles={Object.values(USER_ROLES)} currentUserRole={currentUser.role} />;
      case 'tasks':
        return <TaskManager
                  tasks={tasks.filter(task => currentUser.role === USER_ROLES.PRINCIPAL || task.assignedTo === currentUser.role || !task.assignedTo)}
                  projects={projects}
                  addTask={taskHandlers.add} updateTask={taskHandlers.update} deleteTask={taskHandlers.delete}
                  addProject={projectHandlers.add} updateProject={projectHandlers.update} deleteProject={projectHandlers.delete}
                  userRoles={Object.values(USER_ROLES)} currentUserRole={currentUser.role} />;
      case 'reports':
        return <ReportGenerator documents={documents} tasks={tasks} projects={projects} currentUser={currentUser} />;
      case 'ai-insights':
        return <AISuggestions data={{ documents, tasks, projects }} currentUser={currentUser} />;
      case 'announcements':
        return <Announcements announcements={announcements} addAnnouncement={announcementHandlers.add} updateAnnouncement={announcementHandlers.update} deleteAnnouncement={announcementHandlers.delete} currentUserRole={currentUser.role} USER_ROLES={USER_ROLES} />;
      case 'portals': return <PlaceholderPage title="Student & Parent Portals" description="Secure access to grades, attendance, assignments, and learning resources." icon="Users" />;
      case 'calendar': return <PlaceholderPage title="Calendar of Events" description="Interactive calendar for school activities, holidays, and events." icon="CalendarDays" />;
      case 'gallery': return <PlaceholderPage title="School Gallery / Virtual Tour" description="Visual content showcasing school facilities and events." icon="Image" />;
      case 'enrollment': return <PlaceholderPage title="Online Enrollment & Admission" description="Streamlined process for new and current student enrollment." icon="ClipboardEdit" />;
      case 'e-learning': return <PlaceholderPage title="E-Learning Resources" description="Links to online classes, LMS, and educational materials." icon="BookOpen" />;
      case 'contact': return <PlaceholderPage title="Contact & Support" description="Easy access to contact details and inquiry forms." icon="Mail" />;
      case 'social': return <PlaceholderPage title="Social Media Hub" description="Connect with the school’s social media profiles." icon="Share2" />;
      case 'alumni': return <PlaceholderPage title="Alumni & Community" description="Space for alumni achievements and community involvement." icon="Users2" />;
      default: return <Dashboard documents={documents} tasks={tasks} projects={projects} announcements={announcements} completedPercentage={getCompletedDocumentsPercentage()} pendingCount={getPendingDocumentsCount()} lateCount={3} aiSuggestionsCount={4} currentUser={currentUser} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-900">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} currentUser={currentUser} />
      
      <div className="flex pt-16">
        <Sidebar 
          categories={categories} 
          setCategories={(cats) => { setCategories(cats); saveDataToLocalStorage('categories', cats); }} 
          currentUserRole={currentUser.role}
          setActiveTab={setActiveTab}
        />
        
        <motion.main 
          className="flex-1 p-6 overflow-auto h-[calc(100vh-64px)]" 
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderActiveTab()}
        </motion.main>
      </div>
      
      <Toaster />
    </div>
  );
}

export default App;
