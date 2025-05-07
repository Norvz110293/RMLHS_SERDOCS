
import React from 'react';
import { Brain, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const AISuggestions = ({ data, currentUser }) => {
  const { documents, tasks } = data;

  // Basic AI logic placeholders
  const getLateSubmissions = () => documents.filter(doc => new Date(doc.date) < new Date() && doc.status !== 'Available');
  const getOverdueTasks = () => tasks.filter(task => new Date(task.dueDate) < new Date() && task.status !== 'Completed');
  const getHighPriorityTasks = () => tasks.filter(task => task.priority === 'High' && task.status !== 'Completed'); // Assuming tasks can have priority

  const lateSubmissions = getLateSubmissions();
  const overdueTasks = getOverdueTasks();
  const highPriorityTasks = getHighPriorityTasks(); // Example

  const suggestions = [];

  if (lateSubmissions.length > 0) {
    suggestions.push({
      id: 'late_docs',
      type: 'warning',
      title: `Late Document Submissions (${lateSubmissions.length})`,
      message: `There are ${lateSubmissions.length} documents that appear to be late. Consider following up with the responsible personnel.`,
      details: lateSubmissions.map(d => `${d.name} (Assigned: ${d.assignedTo || 'N/A'}, Due: ${d.date})`).join(', '),
      action: "Review Documents"
    });
  }

  if (overdueTasks.length > 0) {
    suggestions.push({
      id: 'overdue_tasks',
      type: 'critical',
      title: `Overdue Tasks (${overdueTasks.length})`,
      message: `${overdueTasks.length} tasks are overdue. Immediate attention might be required to prevent delays.`,
      details: overdueTasks.map(t => `${t.name} (Assigned: ${t.assignedTo || 'N/A'}, Due: ${t.dueDate})`).join(', '),
      action: "View Tasks"
    });
  }
  
  if (highPriorityTasks.length > 0) {
     suggestions.push({
      id: 'high_priority_tasks',
      type: 'info',
      title: `High Priority Tasks (${highPriorityTasks.length})`,
      message: `There are ${highPriorityTasks.length} high priority tasks that need attention. Ensure these are being addressed.`,
      details: highPriorityTasks.map(t => `${t.name} (Assigned: ${t.assignedTo || 'N/A'}, Due: ${t.dueDate})`).join(', '),
      action: "View Tasks"
    });
  }

  if (suggestions.length === 0) {
    suggestions.push({
      id: 'all_clear',
      type: 'success',
      title: 'All Clear!',
      message: 'No immediate critical issues detected by AI analysis. Keep up the great work!',
      details: 'System data appears to be in good order based on current checks.',
      action: "Dashboard"
    });
  }
  
  const getIcon = (type) => {
    if (type === 'critical') return <AlertTriangle className="h-8 w-8 text-red-500" />;
    if (type === 'warning') return <AlertTriangle className="h-8 w-8 text-yellow-500" />;
    if (type === 'info') return <Lightbulb className="h-8 w-8 text-blue-500" />;
    if (type === 'success') return <CheckCircle className="h-8 w-8 text-green-500" />;
    return <Lightbulb className="h-8 w-8 text-gray-500" />;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({ 
      opacity: 1, 
      y: 0, 
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" } 
    })
  };

  return (
    <motion.div 
      className="space-y-8 p-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-slate-700">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-100 flex items-center">
          <Brain className="mr-3 h-8 w-8 text-purple-600 dark:text-purple-400" />
          AI-Powered Insights & Interventions
        </h1>
      </div>
      
      <p className="text-gray-600 dark:text-slate-400">
        Welcome, {currentUser.name}. Based on the current data, here are some interpretations, possible implications, and suggested interventions to address the needs of learners and improve operational efficiency.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className={`p-6 rounded-xl shadow-xl border flex flex-col justify-between
              ${suggestion.type === 'critical' ? 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700' : ''}
              ${suggestion.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700' : ''}
              ${suggestion.type === 'info' ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700' : ''}
              ${suggestion.type === 'success' ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700' : ''}
            `}
          >
            <div>
              <div className="flex items-center mb-3">
                {getIcon(suggestion.type)}
                <h2 className={`ml-3 text-xl font-semibold 
                  ${suggestion.type === 'critical' ? 'text-red-700 dark:text-red-300' : ''}
                  ${suggestion.type === 'warning' ? 'text-yellow-700 dark:text-yellow-300' : ''}
                  ${suggestion.type === 'info' ? 'text-blue-700 dark:text-blue-300' : ''}
                  ${suggestion.type === 'success' ? 'text-green-700 dark:text-green-300' : ''}
                `}>{suggestion.title}</h2>
              </div>
              <p className={`text-sm mb-2 
                ${suggestion.type === 'critical' ? 'text-red-600 dark:text-red-400' : ''}
                ${suggestion.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' : ''}
                ${suggestion.type === 'info' ? 'text-blue-600 dark:text-blue-400' : ''}
                ${suggestion.type === 'success' ? 'text-green-600 dark:text-green-400' : ''}
              `}>{suggestion.message}</p>
              <details className="text-xs text-gray-500 dark:text-slate-500 mb-4">
                <summary className="cursor-pointer hover:underline">View Details</summary>
                <p className="mt-1 pl-2 border-l-2 border-gray-300 dark:border-slate-600">{suggestion.details}</p>
              </details>
            </div>
            {suggestion.action && (
              <Button 
                variant="outline" 
                size="sm" 
                className={`w-full mt-auto
                  ${suggestion.type === 'critical' ? 'border-red-500 text-red-500 hover:bg-red-100 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/50' : ''}
                  ${suggestion.type === 'warning' ? 'border-yellow-500 text-yellow-500 hover:bg-yellow-100 dark:border-yellow-600 dark:text-yellow-400 dark:hover:bg-yellow-900/50' : ''}
                  ${suggestion.type === 'info' ? 'border-blue-500 text-blue-500 hover:bg-blue-100 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/50' : ''}
                  ${suggestion.type === 'success' ? 'border-green-500 text-green-500 hover:bg-green-100 dark:border-green-600 dark:text-green-400 dark:hover:bg-green-900/50' : ''}
                `}
              >
                {suggestion.action}
              </Button>
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="mt-10 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-200 mb-3">Disclaimer</h3>
        <p className="text-sm text-gray-600 dark:text-slate-400">
          The insights and suggestions provided by this AI module are based on the available data and predefined algorithms. They are intended to assist in decision-making but should not replace professional judgment. Always verify critical information and consider multiple factors before taking action.
        </p>
      </div>
    </motion.div>
  );
};

export default AISuggestions;
