# Blogs Galaxy

Blogs Galaxy is a modern, full-stack blogging platform designed to provide a rich and interactive content experience. It features dynamic blog post management, category-based content organization, user authentication, and an integrated AI chat assistant powered by Google Gemini. The platform also incorporates interactive 3D models to enhance the user interface.

## Features

*   **Dynamic Blog Management**: Create, edit, and publish blog posts with rich content.
*   **Category-Based Content**: Organize blog posts into various categories for easy navigation.
*   **User Authentication**: Secure user registration and login powered by Firebase.
*   **Admin Dashboard**: Dedicated section for administrators to manage users, comments, and blog posts.
*   **Google Gemini AI Integration**: An interactive chat assistant to provide insights or engage with users.
*   **Interactive 3D Models**: Visually appealing 3D models rendered using Three.js and React Three Fiber, enhancing the user experience.
*   **Responsive Design**: Optimized for various screen sizes, providing a seamless experience across devices.
*   **Firebase Backend**: Utilizes Firebase for authentication, real-time database, and storage.

## Technologies Used

*   **Frontend**:
    *   Next.js (React Framework)
    *   Tailwind CSS (for styling)
    *   Jotai (for state management)
    *   Three.js & React Three Fiber (for 3D rendering)
*   **Backend**:
    *   Next.js API Routes
    *   Firebase (Authentication, Firestore Database, Storage)
    *   Google Gemini API
*   **Development Tools**:
    *   ESLint (for code linting)
    *   PostCSS

## Getting Started

Follow these steps to set up and run Blogs Galaxy locally on your machine.

### Prerequisites

Make sure you have the following installed:

*   Node.js (LTS version recommended)
*   npm or Yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd blogs-galaxy
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables. You will need to obtain these credentials from your Firebase project and Google Cloud Console (for Gemini API).

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

GEMINI_API_KEY=your_gemini_api_key
```

### Running the Development Server

To start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

The project follows a standard Next.js application structure:

```
blogs-galaxy/
├── public/                 # Static assets (images, 3D models)
├── src/
│   ├── app/                # Next.js App Router (pages, layouts, API routes)
│   │   ├── (sub pages)/    # Category-specific pages
│   │   ├── api/            # API routes (e.g., /api/gemini)
│   │   └── ...
│   ├── components/         # Reusable React components
│   │   ├── Admin/          # Admin dashboard components
│   │   ├── Auth/           # Authentication components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── models/         # 3D model components
│   │   ├── navigation/     # Navigation components
│   │   └── UI/             # UI elements
│   ├── lib/                # Library functions (e.g., Firebase initialization)
│   └── utils/              # Utility functions (API calls)
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── ...
```

## License

This project is licensed under the [MIT License](LICENSE).
