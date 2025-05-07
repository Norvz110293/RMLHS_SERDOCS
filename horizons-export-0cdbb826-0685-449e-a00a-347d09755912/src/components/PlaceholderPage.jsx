
import React from 'react';
import { motion } from 'framer-motion';
import { IconoirProvider, Iconoir } from 'iconoir-react';
import * as LucideIcons from 'lucide-react';

const PlaceholderPage = ({ title, description, icon }) => {
  const IconComponent = LucideIcons[icon] || LucideIcons.Construction;

  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full text-center p-8 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <IconComponent className="h-24 w-24 text-blue-500 dark:text-sky-400 mb-8" strokeWidth={1.5} />
      <h1 className="text-4xl font-bold text-gray-800 dark:text-slate-100 mb-4">{title}</h1>
      <p className="text-lg text-gray-600 dark:text-slate-400 max-w-md mb-8">{description}</p>
      <div className="flex items-center text-sm text-gray-500 dark:text-slate-500">
        <LucideIcons.Construction className="h-5 w-5 mr-2" />
        <span>This page is currently under construction. Check back soon!</span>
      </div>
    </motion.div>
  );
};

export default PlaceholderPage;
