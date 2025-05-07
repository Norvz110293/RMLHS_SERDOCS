
import React from 'react';
import { 
  FileCheck, Clock, AlertCircle, BrainCircuit, Users, ListChecks, BarChart3,
  Upload, Download, Eye, FileSignature, Printer, Info, Briefcase, Megaphone, CalendarDays
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Dashboard = ({ 
  documents, 
  tasks,
  projects,
  announcements,
  completedPercentage, 
  pendingCount, 
  lateCount, 
  aiSuggestionsCount,
  currentUser,
  setActiveTab
}) => {
  const recentDocuments = [...documents]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const upcomingTasks = [...tasks]
    .filter(task => task.status !== 'Completed' && new Date(task.dueDate) >= new Date())
    .sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0,3);

  const activeProjects = projects.filter(p => p.status === 'Active').slice(0,3);
  
  const recentAnnouncements = [...announcements]
    .sort((a,b) => new Date(b.date) - new Date(a.date))
    .slice(0,2);


  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  const quickActionButtons = [
    { label: 'Upload Doc', icon: <Upload className="h-4 w-4 mr-2" />, color: 'bg-blue-600 hover:bg-blue-700', action: () => setActiveTab('documents') },
    { label: 'New Task', icon: <ListChecks className="h-4 w-4 mr-2" />, color: 'bg-green-600 hover:bg-green-700', action: () => setActiveTab('tasks') },
    { label: 'View Reports', icon: <BarChart3 className="h-4 w-4 mr-2" />, color: 'bg-amber-600 hover:bg-amber-700', action: () => setActiveTab('reports') },
    { label: 'AI Insights', icon: <BrainCircuit className="h-4 w-4 mr-2" />, color: 'bg-purple-600 hover:bg-purple-700', action: () => setActiveTab('ai-insights') },
    { label: 'Calendar', icon: <CalendarDays className="h-4 w-4 mr-2" />, color: 'bg-red-600 hover:bg-red-700', action: () => setActiveTab('calendar') },
  ];

  const statsCards = [
    { title: 'Completed Documents', value: `${completedPercentage}%`, icon: <FileCheck className="h-6 w-6 text-blue-600" />, bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    { title: 'Pending Reports', value: pendingCount, icon: <AlertCircle className="h-6 w-6 text-red-600" />, bgColor: 'bg-red-100 dark:bg-red-900/30' },
    { title: 'Late Submissions', value: lateCount, icon: <Clock className="h-6 w-6 text-amber-600" />, bgColor: 'bg-amber-100 dark:bg-amber-900/30' },
    { title: 'AI Suggestions', value: aiSuggestionsCount, icon: <BrainCircuit className="h-6 w-6 text-green-600" />, bgColor: 'bg-green-100 dark:bg-green-900/30' },
    { title: 'Active Projects', value: projects.filter(p => p.status === 'Active').length, icon: <Briefcase className="h-6 w-6 text-indigo-600" />, bgColor: 'bg-indigo-100 dark:bg-indigo-900/30' },
    { title: 'Pending Tasks', value: tasks.filter(t => t.status !== 'Completed').length, icon: <ListChecks className="h-6 w-6 text-teal-600" />, bgColor: 'bg-teal-100 dark:bg-teal-900/30' },
  ];


  return (
    <div className="space-y-8">
      <motion.div 
        className="flex flex-col md:flex-row items-center justify-between pb-4 border-b border-gray-200 dark:border-slate-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-100">Welcome, {currentUser.name}!</h1>
          <p className="text-gray-600 dark:text-slate-400">Here's your overview for today, {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.</p>
        </div>
        
        <div className="flex space-x-2 mt-4 md:mt-0">
          {quickActionButtons.map(btn => (
            <Button key={btn.label} className={`${btn.color} text-white shadow-md transition-transform hover:scale-105 text-xs md:text-sm`} onClick={btn.action}>
              {btn.icon}
              {btn.label}
            </Button>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {statsCards.map(card => (
          <motion.div 
            key={card.title}
            variants={item}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 flex items-center hover:shadow-xl transition-shadow duration-300"
          >
            <div className={`p-4 ${card.bgColor} rounded-full mr-5`}>
              {card.icon}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400">{card.title}</h3>
              <span className="text-3xl font-bold text-gray-800 dark:text-slate-100">{card.value}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-800/50">
            <h2 className="font-semibold text-lg text-gray-800 dark:text-slate-100">Recent Documents</h2>
            <Button variant="link" size="sm" className="text-blue-600 hover:text-blue-800 dark:text-sky-400 dark:hover:text-sky-300" onClick={() => setActiveTab('documents')}>
              View all
            </Button>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-slate-700 max-h-96 overflow-y-auto">
            {recentDocuments.length > 0 ? recentDocuments.map((doc, index) => (
              <motion.div 
                key={doc.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                initial={{ opacity: 0, y:10 }}
                animate={{ opacity: 1, y:0 }}
                transition={{ delay: 0.1 * index + 0.3, duration: 0.3 }}
              >
                <div className="font-medium text-gray-800 dark:text-slate-200">{doc.name}</div>
                <div className="text-xs text-gray-500 dark:text-slate-400">{doc.category} - {doc.date}</div>
                <span className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    doc.status === 'Available' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                  }`}>
                    {doc.status}
                  </span>
              </motion.div>
            )) : <p className="p-4 text-sm text-gray-500 dark:text-slate-400">No recent documents.</p>}
          </div>
        </motion.div>

        <motion.div 
          className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-800/50">
            <h2 className="font-semibold text-lg text-gray-800 dark:text-slate-100">Upcoming Tasks</h2>
            <Button variant="link" size="sm" className="text-blue-600 hover:text-blue-800 dark:text-sky-400 dark:hover:text-sky-300" onClick={() => setActiveTab('tasks')}>
              View all
            </Button>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-slate-700 max-h-96 overflow-y-auto">
            {upcomingTasks.length > 0 ? upcomingTasks.map((task, index) => (
              <motion.div 
                key={task.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                initial={{ opacity: 0, y:10 }}
                animate={{ opacity: 1, y:0 }}
                transition={{ delay: 0.1 * index + 0.4, duration: 0.3 }}
              >
                <div className="font-medium text-gray-800 dark:text-slate-200">{task.name}</div>
                <div className="text-xs text-gray-500 dark:text-slate-400">Due: {task.dueDate} - Assigned to: {task.assignedTo}</div>
                 <span className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    task.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                    task.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                  }`}>
                    {task.status}
                  </span>
              </motion.div>
            )) : <p className="p-4 text-sm text-gray-500 dark:text-slate-400">No upcoming tasks.</p>}
          </div>
        </motion.div>

        <motion.div 
          className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-800/50">
            <h2 className="font-semibold text-lg text-gray-800 dark:text-slate-100">Announcements</h2>
            <Button variant="link" size="sm" className="text-blue-600 hover:text-blue-800 dark:text-sky-400 dark:hover:text-sky-300" onClick={() => setActiveTab('announcements')}>
              View all
            </Button>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-slate-700 max-h-96 overflow-y-auto">
            {recentAnnouncements.length > 0 ? recentAnnouncements.map((announcement, index) => (
              <motion.div 
                key={announcement.id}
                className="p-5 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * index + 0.6, duration: 0.3 }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Megaphone className="h-5 w-5 text-blue-500 dark:text-sky-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-md font-medium text-gray-800 dark:text-slate-200">{announcement.title}</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-slate-300 line-clamp-2">{announcement.content}</p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">{new Date(announcement.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </motion.div>
            )) : <p className="p-4 text-sm text-gray-500 dark:text-slate-400">No recent announcements.</p>}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
