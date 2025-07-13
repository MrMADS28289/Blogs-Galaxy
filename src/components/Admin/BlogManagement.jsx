import React, { useState } from 'react';
import BlogListAdmin from './BlogListAdmin';
import BlogForm from './BlogForm';

const BlogManagement = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const handleBlogCreated = () => {
    setShowCreateForm(false);
    setEditingBlog(null); // Clear editing state
    // You might want to add a mechanism to refresh the BlogListAdmin here
    // For example, by passing a refresh function down or using a global state update
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setShowCreateForm(true); // Show the form for editing
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setShowCreateForm(!showCreateForm);
            setEditingBlog(null); // Clear editing state when toggling
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          {showCreateForm ? "View All Blogs" : "Create New Blog"}
        </button>
      </div>

      {showCreateForm ? (
        <BlogForm onBlogCreated={handleBlogCreated} blog={editingBlog} />
      ) : (
        <BlogListAdmin onEdit={handleEditBlog} />
      )}
    </div>
  );
};

export default BlogManagement;
