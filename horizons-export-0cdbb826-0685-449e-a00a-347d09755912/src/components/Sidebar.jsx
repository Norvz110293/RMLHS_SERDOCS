
import React, { useState } from 'react';
import { 
  ChevronDown, ChevronRight, FileText, Folder, ListChecks, BarChart3, Brain,
  Megaphone, Users, CalendarDays, Image, ClipboardEdit, BookOpen, Mail, Share2, Users2, LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Sidebar = ({ categories, currentUserRole, setActiveTab }) => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedMore, setExpandedMore] = useState(false);

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const mainNavigation = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5 text-primary" />, tab: 'dashboard' },
    { id: 'documents', label: 'Documents', icon: <FileText className="h-5 w-5 text-primary" />, tab: 'documents' },
    { id: 'tasks', label: 'Tasks & Projects', icon: <ListChecks className="h-5 w-5 text-primary" />, tab: 'tasks' },
    { id: 'reports', label: 'Reports', icon: <BarChart3 className="h-5 w-5 text-primary" />, tab: 'reports' },
    { id: 'ai-insights', label: 'AI Insights', icon: <Brain className="h-5 w-5 text-primary" />, tab: 'ai-insights' },
  ];

  const moreNavigation = [
    { id: 'announcements', label: 'Announcements', icon: <Megaphone className="h-5 w-5 text-primary" />, tab: 'announcements' },
    { id: 'portals', label: 'Portals', icon: <Users className="h-5 w-5 text-primary" />, tab: 'portals' },
    { id: 'calendar', label: 'Calendar', icon: <CalendarDays className="h-5 w-5 text-primary" />, tab: 'calendar' },
    { id: 'gallery', label: 'Gallery', icon: <Image className="h-5 w-5 text-primary" />, tab: 'gallery' },
    { id: 'enrollment', label: 'Enrollment', icon: <ClipboardEdit className="h-5 w-5 text-primary" />, tab: 'enrollment' },
    { id: 'e-learning', label: 'E-Learning', icon: <BookOpen className="h-5 w-5 text-primary" />, tab: 'e-learning' },
    { id: 'contact', label: 'Contact', icon: <Mail className="h-5 w-5 text-primary" />, tab: 'contact' },
    { id: 'social', label: 'Social Media', icon: <Share2 className="h-5 w-5 text-primary" />, tab: 'social' },
    { id: 'alumni', label: 'Alumni', icon: <Users2 className="h-5 w-5 text-primary" />, tab: 'alumni' },
  ];


  return (
    <motion.div 
      className="w-72 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 min-h-[calc(100vh-64px)] p-5 shadow-md"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "circOut" }}
    >
      <div className="space-y-2 mb-6">
        {mainNavigation.map(item => (
          <Button
            key={item.id}
            variant="ghost"
            className="w-full justify-start text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-primary dark:hover:text-sky-400 py-3 px-4 rounded-lg transition-all duration-200"
            onClick={() => setActiveTab(item.tab)}
          >
            {item.icon}
            <span className="ml-3 text-md font-medium">{item.label}</span>
          </Button>
        ))}
        <div>
          <Button
            variant="ghost"
            className="w-full justify-between text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-primary dark:hover:text-sky-400 py-3 px-4 rounded-lg transition-all duration-200"
            onClick={() => setExpandedMore(!expandedMore)}
          >
            <span className="flex items-center">
              <Folder className="h-5 w-5 text-primary mr-3" />
              <span className="text-md font-medium">More</span>
            </span>
            {expandedMore ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </Button>
          <AnimatePresence>
            {expandedMore && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden pl-4 mt-1 space-y-1 border-l-2 border-gray-200 dark:border-slate-600 ml-2"
              >
                {moreNavigation.map(item => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className="w-full justify-start text-sm text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-primary dark:hover:text-sky-400 py-2.5 px-3 rounded-md transition-colors duration-200 group"
                    onClick={() => setActiveTab(item.tab)}
                  >
                    {item.icon && React.cloneElement(item.icon, {className: "h-4 w-4 mr-2.5 text-gray-400 dark:text-slate-500 group-hover:text-primary dark:group-hover:text-sky-400"})}
                    {item.label}
                  </Button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="flex items-center mb-4 pt-4 border-t border-gray-200 dark:border-slate-700">
        <Folder className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200">Document Categories</h2>
      </div>
      
      <div className="space-y-1">
        {categories.filter(c => c.name !== 'Tasks & Projects').map(category => (
          <div key={category.id} className="mb-1">
            <button
              className="w-full flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md transition-colors duration-200 group"
              onClick={() => toggleCategory(category.id)}
            >
              <span className="font-medium text-gray-700 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-sky-400">{category.name}</span>
              {expandedCategories[category.id] ? (
                <ChevronDown className="h-5 w-5 text-gray-500 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-sky-400" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-500 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-sky-400" />
              )}
            </button>
            
            <AnimatePresence>
              {expandedCategories[category.id] && category.subcategories.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pl-5 mt-1 space-y-1 border-l-2 border-gray-200 dark:border-slate-600 ml-2">
                    {category.subcategories.map(subcategory => (
                      <button
                        key={subcategory.id}
                        className="w-full flex items-center p-2.5 text-sm text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-primary dark:hover:text-sky-400 rounded-md transition-colors duration-200 group"
                        onClick={() => setActiveTab('documents')} 
                      >
                        <FileText className="h-4 w-4 mr-2.5 text-gray-400 dark:text-slate-500 group-hover:text-primary dark:group-hover:text-sky-400" />
                        {subcategory.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;
