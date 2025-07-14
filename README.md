# Blogs Galaxy

## Project Description

Blogs Galaxy is a dynamic and interactive blogging platform built with Next.js. It features a visually engaging user interface with 3D models, robust authentication, and a comprehensive blogging system that includes functionalities like creating, viewing, commenting on, and liking blog posts. The application aims to provide a unique and immersive experience for users to explore and share content.

## Features

- **User Authentication**: Secure user registration and login powered by Firebase.
- **Interactive 3D Models**: Engaging 3D models rendered using Three.js, React Three Fiber, and Drei, enhancing the visual experience.
- **Blog Management**: Users can create, view, and interact with blog posts.
- **Commenting System**: Users can comment on blog posts.
- **Like Functionality**: Users can like and unlike blog posts.
- **Responsive Design**: Built with Tailwind CSS for a modern and responsive user interface.
- **Global State Management**: Utilizes Jotai for efficient and scalable state management.
- **Form Handling**: Implements React Hook Form for streamlined form validation and submission.
- **Notifications**: Integrated with Sonner for elegant toast notifications.
- **Email Functionality**: Uses EmailJS for sending emails.
- **Admin Panel**: A comprehensive admin panel for managing the application.
  - **Blog Management**: Admins can create, edit, and delete blog posts.
  - **User Management**: Admins can view, delete, and manage user roles.
  - **Comment Management**: Admins can view and delete comments.
  - **Analytics and Reporting**: Admins can view basic statistics about the application.

## Technologies Used

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **State Management**: Jotai
- **Authentication**: Firebase
- **Forms**: React Hook Form
- **Icons**: Lucide React, React Icons
- **Notifications**: Sonner
- **Email**: EmailJS
- **Other**: clsx, framer-motion, sharp

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or Yarn

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

Create a `.env.local` file in the root of the project and add your environment variables. You will need Firebase configuration for authentication and potentially other API keys.

Example `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

NEXT_PUBLIC_BACKEND_URL=http://localhost:8080/api
```

**Note**: The `NEXT_PUBLIC_BACKEND_URL` should point to your backend API for blog functionalities. Ensure your backend is running and accessible.

### Running the Application

1.  **Development Mode**:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

2.  **Build for Production**:

    ```bash
    npm run build
    # or
    yarn build
    ```

    This command builds the application for production to the `.next` folder.

3.  **Start Production Server**:

    ```bash
    npm run start
    # or
    yarn start
    ```

    This command starts a Next.js production server.

## Project Structure

- `src/app`: Contains the main application pages and layout.
- `src/components`: Reusable React components, including UI elements, authentication forms, and 3D models.
- `src/lib`: Utility functions and configurations (e.g., Firebase initialization).
- `src/utils`: API service files for interacting with backend endpoints (e.g., `authApi.js`, `blogApi.js`).
- `public`: Static assets like images, audio, and 3D models.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
