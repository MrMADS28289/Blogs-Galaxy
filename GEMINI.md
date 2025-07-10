# Gemini Interaction Rules

1.  **Language**: Always respond in English.
2.  **Permissions for Changes**: Always ask for permission before making any changes to files.
3.  **Deletion Confirmation**: If a deletion is required, inform me and I will perform the deletion.
4.  **Task Logging ("take note")**: If you are told "take note", you must record all completed and pending tasks in this `GEMINI.md` file. This will ensure that upon reading this file, you can understand the ongoing work and its status from a new session.
5.  **Summarize Answers**: Provide a short summary of each answer to help with quick understanding.

## current task

# Blogs Galaxy Backend info

The server will run on `http://localhost:5000`.

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user. (Public)
- `POST /api/auth/login`: Log in a user and get a JWT. (Public)

### Blog Posts

- `POST /api/blogs`: Create a new blog post. (Authenticated)
- `GET /api/blogs`: Get all blog posts. (Public)
- `GET /api/blogs/:id`: Get a single blog post by ID. (Public)
- `PUT /api/blogs/:id`: Update a blog post by ID. (Authenticated & Owner)
- `DELETE /api/blogs/:id`: Delete a blog post by ID. (Authenticated & Owner)
- `POST /api/blogs/:id/rate`: Rate a blog post. (Authenticated)

### Comments

- `POST /api/comments`: Create a new comment. (Authenticated)
- `GET /api/comments/blog/:blogId`: Get all comments for a specific blog. (Public)
- `PUT /api/comments/:id`: Update a comment by ID. (Authenticated & Owner)
- `DELETE /api/comments/:id`: Delete a comment by ID. (Authenticated & Owner)
