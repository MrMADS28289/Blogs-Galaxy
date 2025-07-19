"use client";

import React, { useState, useRef, useEffect } from "react";

const GeminiChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Set to false to prevent auto-open on initial load
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial greeting when component mounts and is open
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          sender: "ai",
          text: "Hi! I'm a Galaxy Rangers. Did you lost in Blogs Space?",
        },
      ]);
    }
  }, [isOpen, messages.length]); // Add messages.length to dependency array to re-run if messages change

  const sendMessage = async (question = input) => {
    if (!question.trim()) return;

    const userMessage = { sender: "user", text: question };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    // Handle predefined answers for suggested questions
    if (question === "What is this website about?") {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "ai",
          text: "Blogs Galaxy is a modern blogging platform where users can read, explore, and interact with blog posts across various categories. It offers secure user authentication, a smooth and responsive interface, and features like commenting and categorized content browsing. Built with Next.js, React, and Firebase, it also includes an admin dashboard for managing blog posts, users, and comments. The site combines dynamic visuals, 3D elements, and animations to create an engaging user experience.",
        },
      ]);
      setLoading(false);
      return;
    }
    if (question === "What technologies are used here?") {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "ai",
          text: "Blogs Galaxy uses a modern tech stack combining frontend and backend tools to deliver a dynamic blogging experience. On the frontend, it’s built with Next.js and React, styled using Tailwind CSS, and animated with Framer Motion. It also includes 3D visuals through React Three Fiber and Drei. For state management, it uses Jotai, and TypeScript is used for type safety. On the backend, Firebase handles authentication, Firestore is used as the database, and Firebase Storage manages media files. Development tools like ESLint and PostCSS help maintain code quality and CSS processing.",
        },
      ]);
      setLoading(false);
      return;
    }

    let requestBody = { prompt: question };

    // Check if the user is asking to summarize a blog
    const summarizeMatch = question.match(/^summarize blog ID:\s*([a-zA-Z0-9-]+)$/i);
    if (summarizeMatch && summarizeMatch[1]) {
      const blogId = summarizeMatch[1];
      requestBody = { blogId, prompt: `Summarize blog with ID: ${blogId}` }; // Send a generic prompt for summarization
    } else if (question.toLowerCase().includes("give me a blog")) {
      requestBody = { prompt: "give me a blog" };
    } else if (question.toLowerCase().includes("summarize a random blog")) {
      requestBody = { prompt: "summarize a random blog" };
    }

    try {
      const response = await fetch(`${window.location.origin}/api/gemini`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage = { sender: "ai", text: data.text };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: "Error: Could not get a response from the AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" fixed bottom-4 right-4 z-30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="custom-bg text-white p-2 rounded-full shadow-lg text-xs transition-all duration-300 ease-in-out transform hover:scale-110"
      >
        {isOpen ? "Close Chat" : "Open Chat"}
      </button>

      {isOpen && (
        <div className="flex flex-col w-64 h-80 custom-bg rounded-lg overflow-hidden text-gray-100 mt-2 transform origin-bottom-right scale-100 transition-all duration-300 ease-in-out">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 blog-modal-content">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg text-xs  ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white self-end ml-auto"
                    : "bg-gray-700 text-gray-200 self-start mr-auto"
                }`}
                style={{ maxWidth: "80%" }}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div
                className="p-2 text-xs rounded-lg bg-gray-700 text-gray-200 self-start mr-auto"
                style={{ maxWidth: "80%" }}
              >
                Finding in Galaxy...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-2 border-t border-dashed border-orange-500 flex bg-slate-800">
            <input
              type="text"
              className="flex-1 w-11/12 custom-bg p-2 rounded-lg focus:outline-none text-xs text-orange-400 placeholder-orange-500"
              placeholder="Ask..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              disabled={loading}
            />
            <button
              onClick={() => sendMessage()}
              className="ml-2 px-4 py-2 custom-bg text-white rounded-lg hover:text-orange-500"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiChat;
