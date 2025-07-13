'use client';

import React, { useState } from 'react';
import AdminDashboard from '@/components/Admin/AdminDashboard';
import BlogManagement from '@/components/Admin/BlogManagement';
import UserManagement from '@/components/Admin/UserManagement';
import CommentManagement from '@/components/Admin/CommentManagement';
import AnalyticsReporting from '@/components/Admin/AnalyticsReporting';

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState('dashboard'); // 'dashboard', 'blogs', 'users', 'comments', 'analytics'

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'blogs':
        return <BlogManagement />;
      case 'users':
        return <UserManagement />;
      case 'comments':
        return <CommentManagement />;
      case 'analytics':
        return <AnalyticsReporting />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>

      <nav className="mb-8 w-full px-4">
        <ul className="flex flex-wrap justify-center gap-2 md:flex-nowrap md:space-x-4">
          <li>
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`w-full px-4 py-2 rounded-md ${activeSection === 'dashboard' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('blogs')}
              className={`w-full px-4 py-2 rounded-md ${activeSection === 'blogs' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              Manage Blogs
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('users')}
              className={`w-full px-4 py-2 rounded-md ${activeSection === 'users' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              Manage Users
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('comments')}
              className={`w-full px-4 py-2 rounded-md ${activeSection === 'comments' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              Manage Comments
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('analytics')}
              className={`w-full px-4 py-2 rounded-md ${activeSection === 'analytics' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              Analytics & Reporting
            </button>
          </li>
        </ul>
      </nav>

      <div className="w-full max-w-5xl px-4">
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminPage;
