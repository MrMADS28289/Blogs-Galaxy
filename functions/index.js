const functions = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { fetchBlogById, fetchAllBlogs } = require("../src/utils/blogApi");

setGlobalOptions({ maxInstances: 10 });

const WEBSITE_CONTEXT = `
This is a blogging platform called "Blogs Galaxy".

Features:
- User Authentication: Secure user registration and login.
- Blog Post Management: Create, read, update, and delete blog posts (Admin).
- Categorized Content: Browse blog posts by different categories.
- Interactive UI: Engaging user interface with 3D models and animations.
- Responsive Design: Optimized for various screen sizes.
- Comments System: Users can comment on blog posts.
- Admin Dashboard: Tools for managing users, blogs, and comments.

Technologies Used:
- Frontend: Next.js, React, Jotai, Framer Motion, React Three Drei & Fiber, Tailwind CSS
- Backend/Database: Firebase (Authentication, Firestore Database)

Key areas for improvement:
- Security: Migrate authentication token storage from localStorage to more secure HTTP-only cookies.
- TypeScript Adoption: Enforce strict type checking and migrate all .js and .jsx files to .tsx.
- Performance Optimization: Ensure next/image components have width/height, virtualization for long lists, use React.memo, useCallback, useMemo.
- Code Structure & Readability: Centralize API error handling, extract complex logic, consistent API response structures.
- Best Practices: Enhance ESLint configuration.

When answering questions about the website, use the information provided above.
`;

exports.geminiApi = onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt, blogId } = req.body;
    const genAI = new GoogleGenerativeAI(functions.config().gemini.api_key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let fullPrompt = "";

    if (blogId) {
      const blog = await fetchBlogById(blogId);
      if (!blog || !blog.content) {
        return res.status(404).json({ error: "Blog not found or content unavailable." });
      }
      fullPrompt = `Please summarize the following blog post content:\n\n${blog.content}\n\nProvide a concise summary.`;
    } else if (prompt && prompt.toLowerCase().includes("give me a blog")) {
      const { blogs: allBlogs } = await fetchAllBlogs();
      if (!allBlogs || allBlogs.length === 0) {
        return res.status(200).json({ text: "Sorry, I couldn't find any blogs at the moment." });
      }
      const randomBlog = allBlogs[Math.floor(Math.random() * allBlogs.length)];
      if (!randomBlog || !randomBlog.title || !randomBlog._id || !randomBlog.content) {
        return res.status(200).json({ text: "Sorry, I found a blog but it's missing some details (title, ID, or content)." });
      }
      return res.status(200).json({ text: `Here's a random blog for you: "${randomBlog.title}"\n\nContent:\n${randomBlog.content}` });
    } else if (prompt && prompt.toLowerCase().includes("summarize a random blog")) {
      const { blogs: allBlogs } = await fetchAllBlogs();
      if (!allBlogs || allBlogs.length === 0) {
        return res.status(200).json({ text: "Sorry, I couldn't find any blogs to summarize at the moment." });
      }
      const randomBlog = allBlogs[Math.floor(Math.random() * allBlogs.length)];
      if (!randomBlog || !randomBlog.content) {
        return res.status(200).json({ text: `Sorry, the random blog "${randomBlog.title || 'unknown'}" does not have content available for summarization.` });
      }
      fullPrompt = `Please summarize the following blog post content:\n\n${randomBlog.content}\n\nProvide a concise summary.`;
    } else if (prompt) {
      fullPrompt = `${WEBSITE_CONTEXT}\n\nUser query: ${prompt}`;
    } else {
      return res.status(400).json({ error: "Prompt or blogId is required" });
    }

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ text });
  } catch (error) {
    logger.error("Error calling Gemini API:", error);
    return res.status(500).json({ error: "Failed to get response from AI" });
  }
});