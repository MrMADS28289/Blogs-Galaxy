/**
 * This file defines the data for the main navigation buttons in the application.
 * Each object in the `BtnList` array represents a navigation item, including its label,
 * link, associated icon, and properties for its 3D model representation.
 */
export const BtnList = [
  {
    label: "Tech Galaxy", // Display label for the navigation button.
    link: "/tech", // The URL path for this category.
    icon: "Laptop", // Icon identifier for the button.
    newTab: false, // Indicates if the link should open in a new tab.
    position: [0, 1, 0], // 3D model position [x, y, z].
    scale: [3.5, 3.5, 3.5], // 3D model scale [x, y, z].
    description:
      "Explore the latest in technology, from software development to hardware innovations.", // Description for the category.
  },
  {
    label: "Geography Nebula",
    link: "/geography",
    icon: "Earth",
    newTab: false,
    position: [0, 1, 0],
    scale: [0.4, 0.4, 0.4],
    description:
      "Journey through the wonders of our planet and beyond, discovering diverse landscapes and cultures.",
  },
  {
    label: "History Constellation",
    link: "/history",
    icon: "History",
    newTab: false,
    position: [0, 1, 0],
    scale: [3, 3, 3],
    description:
      "Uncover the past, from ancient civilizations to modern events that shaped our world.",
  },
  {
    label: "AI Universe",
    link: "/ai",
    icon: "Bot",
    newTab: false,
    position: [0, 1, 0],
    scale: [1.5, 1.5, 1.5],
    description:
      "Dive into the world of Artificial Intelligence, machine learning, and intelligent systems.",
  },
  {
    label: "Sports Galaxy",
    link: "/sports",
    icon: "Award",
    newTab: false,
    position: [0, 1, 0],
    scale: [2.5, 2.5, 2.5],
    description:
      "Get updates on your favorite sports, athletes, and major sporting events.",
  },
  {
    label: "Creative Corner",
    link: "/creative",
    icon: "Palette",
    newTab: false,
    position: [0, 1, 0],
    scale: [3, 3, 3],
    description:
      "Unleash your imagination with articles on art, design, music, and creative expression.",
  },
  {
    label: "Motivation Meteor",
    link: "/motivation",
    icon: "Sparkles",
    newTab: false,
    position: [0, 1, 0],
    scale: [0.4, 0.4, 0.4],
    description:
      "Find inspiration and guidance to achieve your goals and live a fulfilling life.",
  },
  {
    label: "Community",
    link: "/community",
    icon: "MessageCircle",
    newTab: false,
    position: [0, 1, 0],
    scale: [0.6, 0.6, 0.6],
    description:
      "Connect with like-minded individuals and explore discussions on various topics.",
  },
];
