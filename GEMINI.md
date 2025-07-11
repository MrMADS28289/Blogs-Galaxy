# Gemini Interaction Rules

1.  **Language**: Always respond in English.
2.  **Deletion Confirmation**: If a deletion is required, inform me and I will perform the deletion.
3.  **Task Logging ("take note")**: If you are told "take note", you must record all completed and pending tasks in this `GEMINI.md` file. This will ensure that upon reading this file, you can understand the ongoing work and its status from a new session.
4.  **Summarize Answers**: Provide a short summary of each answer to help with quick understanding.

## current task
- Implement user authentication with the following specific requirements:
    - **Purpose:** For liking, commenting, and admin blog handling only. No route protection for other routes yet.
    - **Implementation Location:** Login/Register functionality will be integrated into `UserMenu.jsx`.
    - **`UserMenu.jsx` Constraints:**
        - No style changes to `UserMenu.jsx`.
        - The existing three buttons (Profile, Music, Login/Logout) must not be removed or modified.
    - **Login/Logout Button Logic:**
        - If not logged in: The Profile button/icon should redirect to the login page. The Login/Logout button should display a "login icon".
        - If logged in: The Login/Logout button should display a "logout icon".
    - **Login/Register Page Styling:** Must strictly adhere to the existing project theme and design.
    - **Accuracy:** Take time to ensure correctness and avoid issues.

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

### Pending Tasks:
- None
