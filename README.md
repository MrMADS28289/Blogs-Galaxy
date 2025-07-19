# Blogs Galaxy

# Blogs Galaxy

![Next.js](https://img.shields.io/badge/Next.js-13.4-blue)
![Firebase](https://img.shields.io/badge/Firebase-Backend-yellow)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI%20Assistant-red)
![Three.js](https://img.shields.io/badge/Three.js-3D%20Models-orange)
![License: MIT](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen)
![Stars](https://img.shields.io/github/stars/masumsobhan/blogs-galaxy?style=social)
![Forks](https://img.shields.io/github/forks/masumsobhan/blogs-galaxy?style=social)
![Issues](https://img.shields.io/github/issues/masumsobhan/blogs-galaxy)

🧠 Powered by AI | 🎨 3D Visuals | 🔐 Secure Auth | 🧩 Modular Structure

🚀 **Live Demo**: [https://blogs-galaxy.vercel.app](https://blogs-galaxy.vercel.app)

Blogs Galaxy is a modern, full-stack blogging platform designed to provide a rich and interactive content experience. It features dynamic blog post management, category-based content organization, user authentication, and an integrated AI chat assistant powered by Google Gemini. The platform also incorporates interactive 3D models to enhance the user interface.

## Features

- **Dynamic Blog Management**: Create, edit, and publish blog posts with rich content.
- **Category-Based Content**: Organize blog posts into various categories for easy navigation.
- **User Authentication**: Secure user registration and login powered by Firebase.
- **Admin Dashboard**: Dedicated section for administrators to manage users, comments, and blog posts.
- **Google Gemini AI Integration**: An interactive chat assistant to provide insights or engage with users.
- **Interactive 3D Models**: Visually appealing 3D models rendered using Three.js and React Three Fiber, enhancing the user experience.
- **Responsive Design**: Optimized for various screen sizes, providing a seamless experience across devices.
- **Firebase Backend**: Utilizes Firebase for authentication, real-time database, and storage.

## Technologies Used

- **Frontend**:
  - Next.js (v14.2.3)
  - React (v18.3.1)
  - Tailwind CSS (v3.4.1)
  - Jotai (v2.12.5)
  - Framer Motion (v11.0.8)
  - Three.js & React Three Fiber (v8.13.4)
- **Backend**:
  - Next.js API Routes
  - **Firebase** (v11.10.0) (Authentication, Firestore Database, Storage)
  - Google Gemini API (v0.24.1)
- **Development Tools**:
  - ESLint (v8.44.0)
  - PostCSS (v8.4.33)
  - TypeScript (v5.4.5)

## Getting Started

Follow these steps to set up and run Blogs Galaxy locally on your machine.

### Prerequisites

Make sure you have the following installed:

- Node.js (LTS version recommended)
- npm or Yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/blogs-galaxy.git
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
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api
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
├── public/                 # Static assets (images, 3D models, audio)
├── src/
│   ├── app/                # Next.js App Router (pages, layouts, API routes)
│   │   ├── (sub pages)/    # Layout and pages for blog categories
│   │   ├── api/            # API routes (e.g., /api/gemini)
│   │   ├── admin/          # Admin dashboard page
│   │   ├── login/          # Login page
│   │   └── register/       # Register page
│   ├── components/         # Reusable React components
│   │   ├── Admin/          # Components for the admin dashboard
│   │   ├── Auth/           # Authentication components (Login, Register)
│   │   ├── hooks/          # Custom React hooks (useBlogs, useScreenSize)
│   │   ├── models/         # 3D model components
│   │   ├── navigation/     # Navigation components
│   │   └── UI/             # General UI elements (images, error messages)
│   ├── lib/                # Library functions (e.g., Firebase initialization)
│   └── utils/              # Utility functions (API calls to backend)
├── .env.local              # Environment variables
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── ...
```

## Contributing

Contributions are welcome! If you find a bug or have a feature request, feel free to open an issue or submit a pull request.

## 🔐 Demo Admin Credentials

Use this read-only demo account to explore the admin panel:

🧑 Email: `admin@admin.com`  
🔑 Password: `123456`

> Note: This is a demo account with limited permissions for safe exploration.

## License

This project is licensed under the [MIT License](LICENSE).
