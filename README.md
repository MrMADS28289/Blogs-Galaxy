# Blogs Galaxy

## Project Overview

Blogs Galaxy is a celestial-themed blog and content platform built with Next.js. It features an interactive user interface with 3D models and dynamic backgrounds, categorizing content into various "galaxies" and "universes" such as "Tech Galaxy," "AI Universe," "Sports Galaxy," and more. The application aims to provide an engaging and visually rich experience for exploring different topics.

## Features

- **Categorized Content:** Content is organized into distinct sections like Tech Galaxy, AI Universe, Geography Nebula, History Constellation, Sports Galaxy, Creative Corner, Motivation Meteor, and Community.
- **Interactive 3D Elements:** Utilizes React Three Fiber and Three.js to render immersive 3D models and dynamic backgrounds, enhancing the user experience.
- **Responsive Design:** Built with Tailwind CSS to ensure a seamless experience across various devices and screen sizes.
- **Client-Side Routing:** Leverages Next.js for efficient navigation between different content categories without full page reloads.
- **Global State Management:** Employs Jotai for lightweight and flexible state management across the application.
- **Dynamic Data Handling:** Centralized data management for navigation and content categories.

## Technologies Used

- **Next.js:** React framework for building server-side rendered and statically generated web applications.
- **React:** JavaScript library for building user interfaces.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Jotai:** A primitive and flexible state management library for React.
- **React Three Fiber:** A React renderer for Three.js, making it easier to build 3D scenes with React components.
- **Three.js:** A JavaScript 3D library for rendering 3D graphics in the browser.
- **Node.js:** JavaScript runtime environment.
- **npm / Yarn:** Package managers.

## Getting Started

Follow these steps to set up and run the Blogs Galaxy project on your local machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd Blogs-Galaxy
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

To start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application. The page will automatically reload as you make changes.

### Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

This command optimizes the application for production and creates a `.next` folder with the build output.

### Starting the Production Server

To run the built application in production mode:

```bash
npm run start
# or
yarn start
```

## File Structure

The project follows a standard Next.js application structure with a clear separation of concerns.

```
```
Blogs-Galaxy/
├── public/                 # Static assets (images, 3D models, audio)
│   ├── next.svg
│   ├── vercel.svg
│   ├── audio/              # Background audio files
│   ├── background/         # Background images
│   └── models/             # 3D model files (.glb)
├── src/
│   ├── app/                # Next.js App Router directory
│   │   ├── data.js         # Centralized data for navigation and content categories
│   │   ├── favicon.ico
│   │   ├── globals.css     # Global styles and Tailwind CSS imports
│   │   ├── jotaiAtoms.js   # Jotai atoms for global state
│   │   ├── JotaiProvider.jsx # Jotai provider component
│   │   ├── layout.js       # Root layout for the application
│   │   ├── page.js         # Home page component
│   │   └── (sub pages)/    # Dynamic routes for content categories
│   │       ├── layout.js   # Layout for sub-pages
│   │       └── [category]/ # Dynamic category route
│   │           └── page.js
│   └── components/         # Reusable React components
│       ├── BlogCard.jsx
│       ├── BlogList.jsx
│       ├── BlogModal.jsx
│       ├── CommentsModal.jsx
│       ├── Header.jsx
│       ├── HomeBtn.jsx
│       ├── RenderModel.jsx
│       ├── ResponsiveComponent.jsx
│       ├── ScrollButton.jsx
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore file
├── jsconfig.json           # JavaScript language service configuration
├── next.config.mjs         # Next.js configuration file
├── package-lock.json       # npm dependency lock file
├── package.json            # Project metadata and dependencies
├── postcss.config.js       # PostCSS configuration
├── README.md               # This README file
└── tailwind.config.js      # Tailwind CSS configuration
```
```

## How it Works

### Architecture Overview

Blogs Galaxy is a Next.js application that leverages the App Router for routing and data fetching. It combines React components with 3D rendering capabilities using React Three Fiber and Three.js to create an interactive and visually appealing user interface. State management is handled globally using Jotai.

### Core Components and Flow

1.  **Next.js App Router (`src/app/`)**:

    - The `src/app` directory is the heart of the Next.js App Router.
    - `layout.js` defines the root layout, applying global styles (`globals.css`) and wrapping the entire application with necessary providers like `JotaiProvider.jsx`.
    - `page.js` at the root (`src/app/page.js`) serves as the main landing page of the application.
    - The `(sub pages)` directory contains dynamic routes for each content category. For example, `src/app/(sub pages)/techGalaxy/page.js` renders the content for the "Tech Galaxy" section.

2.  **Data Management (`src/app/data.js`)**:

    - This file acts as a central data store.
    - `BtnList`: An array defining the navigation buttons, including their labels, links, icons, and associated 3D model components. This data drives the main navigation of the application.
    - `projectsData`: Placeholder data for potential project listings.

3.  **Navigation (`src/components/navigation/` and `src/components/Header.jsx`)**:

    - `Header.jsx` likely contains the main navigation elements.
    - `src/components/navigation/index.jsx` and `NavButton.jsx` are responsible for rendering the interactive navigation buttons based on the `BtnList` data. Clicking these buttons navigates the user to the respective category pages.

4.  **3D Rendering (`src/components/models/`, `src/components/RenderModel.jsx`, `public/models/`)**:

    - The `public/models` directory stores the 3D models in `.glb` format.
    - `src/components/models/*.jsx` files are React components that encapsulate specific 3D models (e.g., `AiModel.jsx`, `TechModel.jsx`). These components use React Three Fiber to load and display the `.glb` files.
    - `RenderModel.jsx` is a utility component that likely handles the common logic for rendering any 3D model, providing a consistent setup for the Three.js canvas.

5.  **Content Categories (`src/app/(sub pages)/[category]/page.js` and `src/components/[category]/`)**:

    - Each category (e.g., `aiUniverse`, `techGalaxy`) has its own `page.js` within `src/app/(sub pages)/`.
    - Corresponding components in `src/components/[category]/index.jsx` and `ItemLayout.jsx` are responsible for rendering the specific content and layout for that category.

6.  **State Management (Jotai - `src/app/jotaiAtoms.js`, `src/app/JotaiProvider.jsx`)**:

    - Jotai is used for managing global application state, such as screen size (`useScreenSize.jsx`).
    - `jotaiAtoms.js` defines the individual atoms (pieces of state).
    - `JotaiProvider.jsx` wraps the application to make these atoms accessible to all components.

7.  **Styling (Tailwind CSS - `globals.css`, `tailwind.config.js`, `postcss.config.js`)**:
    - Tailwind CSS is integrated for utility-first styling.
    - `globals.css` imports Tailwind's base styles.
    - `tailwind.config.js` allows for customization of Tailwind's default theme and plugins.
    - `postcss.config.js` configures PostCSS for processing CSS with Tailwind.

This detailed `README.md` should provide a comprehensive understanding of the "Blogs Galaxy" project.

# This project's Backend info

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
