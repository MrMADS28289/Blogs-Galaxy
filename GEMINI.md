# Gemini Interaction Rules

1.  **Language**: Always respond in English.
2.  **Deletion Confirmation**: If a deletion is required, inform me and I will perform the deletion.
3.  **Task Logging ("take note")**: If you are told "take note", you must record all completed and pending tasks in this `GEMINI.md` file. This will ensure that upon reading this file, you can understand the ongoing work and its status from a new session.
4.  **Summarize Answers**: Provide a short summary of each answer to help with quick understanding.

## current task
- Implement Google authentication with Firebase.

### Completed Tasks:
1.  Created `src/components/Auth/Login.jsx` and `src/components/Auth/Register.jsx`.
2.  Created `src/utils/authApi.js` for API calls (using native `fetch`).
3.  Updated `src/app/jotaiAtoms.js` for user data, authentication status, and local storage persistence.
4.  Created `src/app/login/page.js` and `src/app/register/page.js`.
5.  Integrated authentication logic and button changes into `src/components/navigation/UserMenu.jsx`.
6.  Added `"use client";` directive to `src/components/Auth/Login.jsx` and `src/components/Auth/Register.jsx`.
7.  Implemented registration logic in `src/components/Auth/Register.jsx`.
8.  Implemented login logic in `src/components/Auth/Login.jsx`.
9.  Added error message display to `src/components/Auth/Login.jsx` and `src/components/Auth/Register.jsx`.
10. Installed Firebase SDK.
11. Initialized Firebase in `src/lib/firebase.js` and created `.env.local` placeholders.
12. Added Google Sign-in button and logic to `src/components/Auth/Login.jsx`.
13. Confirmed Firebase configuration details are saved in `.env.local`.
14. Added `googleSignInUser` function to `src/utils/authApi.js`.
15. Modified `src/components/Auth/Login.jsx` to send Google user data to the backend after successful Google sign-in.
16. Modified `src/components/Auth/Login.jsx` and `src/components/Auth/Register.jsx` to correctly pass user data to `setIsAuthenticated` for session saving.

### Pending Tasks:
- None