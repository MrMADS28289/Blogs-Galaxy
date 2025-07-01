# Blogs Galaxy v.0.1

## Project Overview

Blogs Galaxy is an interactive web application built with Next.js, designed to provide a unique and immersive experience. It features a dynamic 3D galaxy environment, likely serving as a visually engaging platform for blogs or content. The application leverages modern web technologies to deliver a smooth and responsive user interface.

## Features

*   **Interactive 3D Galaxy:** Explore a captivating 3D space environment with celestial bodies (planets).
*   **Responsive Design:** Optimized for various screen sizes using `useScreenSize` hook and responsive components.
*   **Dynamic Backgrounds:** Utilizes high-quality space imagery for immersive visual experiences.
*   **Sound Integration:** Includes sound capabilities for an enhanced user experience.
*   **Smooth Animations:** Incorporates `framer-motion` for fluid UI transitions and animations.
*   **Navigation System:** Intuitive navigation components for easy access to different sections.
*   **Form Handling:** Implements `react-hook-form` for efficient and robust form management (e.g., contact forms, user input).

## Technologies Used

*   **Framework:** [Next.js](https://nextjs.org/) (React Framework)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **3D Graphics:**
    *   [Three.js](https://threejs.org/)
    *   [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
    *   [@react-three/drei](https://github.com/pmndrs/drei)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Icons:** [Lucide React](https://lucide.dev/icons/)
*   **Form Management:** [React Hook Form](https://react-hook-form.com/)
*   **Email Service:** [EmailJS](https://www.emailjs.com/)
*   **Font Optimization:** [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) (Geist font family)

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd blogs-galaxy
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit the file.

## Project Structure

```
.
├── public/                 # Static assets (images, 3D models, audio)
│   ├── audio/
│   ├── background/
│   └── models/
└── src/
    ├── app/                # Next.js app router pages and global styles
    │   ├── (sub pages)/
    │   ├── data.js
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.js
    │   └── page.js
    └── components/         # Reusable React components
        ├── GalaxyBackground.jsx
        ├── GalaxyScene.jsx
        ├── HomeBtn.jsx
        ├── RenderModel.jsx
        ├── ResponsiveComponent.jsx
        ├── Sound.jsx
        ├── hooks/          # Custom React hooks
        │   └── useScreenSize.jsx
        ├── models/         # 3D models components
        │   └── Planet.jsx
        └── navigation/     # Navigation components
            ├── index.jsx
            └── NavButton.jsx
```

## Learn More

To learn more about Next.js, take a look at the following resources:

*   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
*   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.