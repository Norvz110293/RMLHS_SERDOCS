
import React from 'react';
import { 
  Bell, LayoutDashboard, FileText, ListChecks, BarChart3, Brain, LogOut, Settings,
  Megaphone, Users, CalendarDays, Image, ClipboardEdit, BookOpen, Mail, Share2, Users2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal
} from "@/components/ui/dropdown-menu";


const Navbar = ({ activeTab, setActiveTab, currentUser }) => {
  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
    { id: 'documents', label: 'Documents', icon: <FileText className="h-4 w-4 mr-2" /> },
    { id: 'tasks', label: 'Tasks', icon: <ListChecks className="h-4 w-4 mr-2" /> },
    { id: 'reports', label: 'Reports', icon: <BarChart3 className="h-4 w-4 mr-2" /> },
    { id: 'ai-insights', label: 'AI Insights', icon: <Brain className="h-4 w-4 mr-2" /> },
  ];

  const moreNavItems = [
    { id: 'announcements', label: 'Announcements', icon: <Megaphone className="h-4 w-4 mr-2" /> },
    { id: 'portals', label: 'Portals', icon: <Users className="h-4 w-4 mr-2" /> },
    { id: 'calendar', label: 'Calendar', icon: <CalendarDays className="h-4 w-4 mr-2" /> },
    { id: 'gallery', label: 'Gallery', icon: <Image className="h-4 w-4 mr-2" /> },
    { id: 'enrollment', label: 'Enrollment', icon: <ClipboardEdit className="h-4 w-4 mr-2" /> },
    { id: 'e-learning', label: 'E-Learning', icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="h-4 w-4 mr-2" /> },
    { id: 'social', label: 'Social Media', icon: <Share2 className="h-4 w-4 mr-2" /> },
    { id: 'alumni', label: 'Alumni', icon: <Users2 className="h-4 w-4 mr-2" /> },
  ];

  return (
    <motion.nav 
      className="bg-gradient-to-r from-primary to-blue-700 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 shadow-lg"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center">
        <img  class="h-10 w-10 mr-3 rounded-full shadow-md" alt="RMLHS Logo" src="https://images.unsplash.com/photo-1485531865381-286666aa80a9" />
        <h1 className="text-2xl font-bold tracking-tight">RMLHS-SERDOCS</h1>
      </div>
      
      <div className="flex-1 flex justify-center items-center space-x-1">
        {mainNavItems.map(item => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "secondary" : "ghost"}
            className={`
              ${activeTab === item.id ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'} 
              text-white px-3 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-sm
            `}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={moreNavItems.some(item => item.id === activeTab) ? "secondary" : "ghost"}
              className={`
                ${moreNavItems.some(item => item.id === activeTab) ? 'bg-white/20 shadow-inner' : 'hover:bg-white/10'} 
                text-white px-3 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-sm
              `}
            >
              More
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent className="w-56 mr-2 mt-1 bg-white dark:bg-slate-800 shadow-xl rounded-lg border-slate-200 dark:border-slate-700">
              {moreNavItems.map(item => (
                <DropdownMenuItem 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative hover:bg-white/10 rounded-full">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-primary"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 p-2 rounded-full hover:bg-white/10">
              <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center ring-2 ring-white/50">
                {currentUser.avatar ? React.cloneElement(currentUser.avatar, { className: "h-6 w-6 text-white" }) : <span className="text-sm font-medium">{currentUser.name.substring(0,2).toUpperCase()}</span>}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-semibold">{currentUser.name}</p>
                <p className="text-xs opacity-80">{currentUser.role}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent className="w-56 mr-2 mt-1 bg-white dark:bg-slate-800 shadow-xl rounded-lg border-slate-200 dark:border-slate-700">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>
    </motion.nav>
  );
};

export default Navbar;
