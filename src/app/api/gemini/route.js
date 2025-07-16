import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchBlogById, fetchAllBlogs } from "@/utils/blogApi";

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

export async function POST(req) {
  try {
    const { prompt, blogId } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let fullPrompt = "";

    if (blogId) {
      // Handle blog summarization request for a specific blog ID
      const blog = await fetchBlogById(blogId);
      if (!blog || !blog.content) {
        return new Response(JSON.stringify({ error: "Blog not found or content unavailable." }), { status: 404 });
      }
      fullPrompt = `Please summarize the following blog post content:\n\n${blog.content}\n\nProvide a concise summary.`;
    } else if (prompt && prompt.toLowerCase().includes("give me a blog")) {
      // Handle "give me a blog" request
      const { blogs: allBlogs } = await fetchAllBlogs();
      if (!allBlogs || allBlogs.length === 0) {
        return new Response(JSON.stringify({ text: "Sorry, I couldn't find any blogs at the moment." }), { status: 200 });
      }
      const randomBlog = allBlogs[Math.floor(Math.random() * allBlogs.length)];
      // Ensure randomBlog has title and id properties
      if (!randomBlog || !randomBlog.title || !randomBlog._id || !randomBlog.content) {
        return new Response(JSON.stringify({ text: "Sorry, I found a blog but it's missing some details (title, ID, or content)." }), { status: 200 });
      }
      return new Response(JSON.stringify({ text: `Here's a random blog for you: "${randomBlog.title}"\n\nContent:\n${randomBlog.content}` }), { status: 200 });
    } else if (prompt && prompt.toLowerCase().includes("summarize a random blog")) {
      // Handle "summarize a random blog" request
      const { blogs: allBlogs } = await fetchAllBlogs();
      if (!allBlogs || allBlogs.length === 0) {
        return new Response(JSON.stringify({ text: "Sorry, I couldn't find any blogs to summarize at the moment." }), { status: 200 });
      }
      const randomBlog = allBlogs[Math.floor(Math.random() * allBlogs.length)];
      if (!randomBlog || !randomBlog.content) {
        return new Response(JSON.stringify({ text: `Sorry, the random blog "${randomBlog.title || 'unknown'}" does not have content available for summarization.` }), { status: 200 });
      }
      fullPrompt = `Please summarize the following blog post content:\n\n${randomBlog.content}\n\nProvide a concise summary.`;
    } else if (prompt) {
      // Handle general website questions
      fullPrompt = `${WEBSITE_CONTEXT}\n\nUser query: ${prompt}`;
    } else {
      return new Response(JSON.stringify({ error: "Prompt or blogId is required" }), { status: 400 });
    }

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ text }), { status: 200 });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return new Response(JSON.stringify({ error: "Failed to get response from AI" }), { status: 500 });
  }
}