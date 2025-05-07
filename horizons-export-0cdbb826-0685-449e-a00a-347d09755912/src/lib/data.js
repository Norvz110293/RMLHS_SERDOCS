
import React from 'react';

export const USER_ROLES = {
  PRINCIPAL: 'Principal',
  ASSISTANT_PRINCIPAL: 'Assistant School Principal',
  HEAD_TEACHER: 'Head Teacher',
  ADMIN_STAFF: 'Admin Support Staff',
  TEACHER: 'Teacher',
  STUDENT: 'Student',
};

export const initialDocuments = [
  { id: 1, name: 'Faculty Evaluation Form', category: 'Staff Records', status: 'Needs Signature', date: '2025-05-01', assignedTo: USER_ROLES.HEAD_TEACHER },
  { id: 2, name: 'Classroom Inventory Q1', category: 'Inventory', status: 'Available', date: '2025-04-15', assignedTo: USER_ROLES.TEACHER },
  { id: 3, name: 'Form 137 - Juan Dela Cruz', category: 'JHS & SHS Records', status: 'Available', date: '2025-04-10', assignedTo: USER_ROLES.ADMIN_STAFF },
  { id: 4, name: 'Grade 10 Completion Certs Batch 2025', category: 'JHS & SHS Records', status: 'Needs Signature', date: '2025-03-25', assignedTo: USER_ROLES.PRINCIPAL },
  { id: 5, name: 'Employee Records Update 2025', category: 'Staff Records', status: 'Available', date: '2025-03-20', assignedTo: USER_ROLES.ADMIN_STAFF },
];

export const initialCategories = [
  { id: 1, name: 'Academic Reports', subcategories: [
    { id: 11, name: 'JHS & SHS Reports' }, { id: 12, name: 'SHS-Specific Reports' }, { id: 13, name: 'JHS-Specific Reports' },
  ]},
  { id: 2, name: 'Administration', subcategories: [
    { id: 21, name: 'Administrative Reports' }, { id: 22, name: 'Guidance Coordinator Reports' },
  ]},
  { id: 3, name: 'Organizations', subcategories: [
    { id: 31, name: 'SSLG' }, { id: 32, name: 'BKD' }, { id: 33, name: 'YES-O' }, { id: 34, name: 'Other Organizations' },
  ]},
  { id: 4, name: 'Advocacy Programs', subcategories: [
    { id: 41, name: 'GAD' }, { id: 42, name: 'CPP' }, { id: 43, name: 'DRRM / CAM' },
  ]},
  { id: 5, name: 'Inventory', subcategories: [] },
  { id: 6, name: 'Staff Records', subcategories: [] },
  { id: 7, name: 'JHS & SHS Records', subcategories: [] },
  { id: 8, name: 'Community', subcategories: [] },
  { id: 9, name: 'Tasks & Projects', subcategories: [] }, // Keep this if sidebar uses it, or remove if tasks are fully separate
];

export const initialTasks = [
  { id: 1, projectId: 1, name: 'Prepare Q2 Budget Report', status: 'In Progress', dueDate: '2025-06-15', assignedTo: USER_ROLES.ADMIN_STAFF, priority: 'High' },
  { id: 2, projectId: 1, name: 'Finalize School Improvement Plan', status: 'Pending', dueDate: '2025-07-20', assignedTo: USER_ROLES.PRINCIPAL, priority: 'High' },
  { id: 3, projectId: 2, name: 'Organize Math Olympiad', status: 'Completed', dueDate: '2025-05-10', assignedTo: USER_ROLES.TEACHER, priority: 'Medium' },
  { id: 4, projectId: 2, name: 'Submit Activity Report for Math Olympiad', status: 'Pending', dueDate: '2025-05-25', assignedTo: USER_ROLES.TEACHER, priority: 'Medium' },
];

export const initialProjects = [
  { id: 1, name: 'Annual School Reporting SY 2025-2026', description: 'Compilation and submission of all required annual reports for the school year.', status: 'Active', assignedTo: USER_ROLES.PRINCIPAL },
  { id: 2, name: 'Student Development Program Q2', description: 'Activities and programs for student skill enhancement for the second quarter.', status: 'Planning', assignedTo: USER_ROLES.HEAD_TEACHER },
];

export const initialAnnouncements = [
  { id: 1, title: 'Midterm Examinations Schedule', content: 'Please be advised that the midterm examinations for all levels will be held from June 10-14, 2025. Check the bulletin boards for the detailed schedule per subject.', date: '2025-05-05' },
  { id: 2, title: 'School Foundation Day Celebration', content: 'Join us as we celebrate our 50th Founding Anniversary on July 1, 2025! A series of activities are lined up. More details to follow.', date: '2025-04-28' },
];

