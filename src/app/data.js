/*
Websites:

- https://github.com/pmndrs/gltfjsx (GLTF JSX for 3D Models)
- https://lucide.dev/icons/ (Lucide Icons)
- https://github.com/anuraghazra/github-readme-stats (Github Readme Stats)
- https://skillicons.dev (Skill Icons to show skills)
- https://github-readme-streak-stats.herokuapp.com (Github Readme Streak Stats)

:root {
  --background: 27 27 27;
  --foreground: 225 225 225;
  --muted: 115 115 115;
  --accent: 254 254 91; #FEFE5B
}

*/

export const projectsData = [
  {
    id: 1,
    name: "EcoTracker",
    description: "Track your carbon footprint",
    date: "2022-08-15",
    demoLink: "https://ecotracker.example.com",
  },
  {
    id: 2,
    name: "ArtGallery Online",
    description: "Digital art showcase platform",
    date: "2022-06-20",
    demoLink: "https://artgalleryonline.example.com",
  },
  {
    id: 3,
    name: "BudgetPlanner",
    description: "Plan and track expenses",
    date: "2022-09-10",
    demoLink: "https://budgetplanner.example.com",
  },
  {
    id: 4,
    name: "HealthBeat",
    description: "Monitor heart rate zones",
    date: "2022-05-30",
    demoLink: "https://healthbeat.example.com",
  },
  {
    id: 5,
    name: "RecipeFinder",
    description: "Discover new recipes",
    date: "2022-07-12",
    demoLink: "https://recipefinder.example.com",
  },
  {
    id: 6,
    name: "JourneyLogger",
    description: "Log your travels",
    date: "2022-10-01",
    demoLink: "https://journeylogger.example.com",
  },
  {
    id: 7,
    name: "StudyBuddy",
    description: "Collaborative learning platform",
    date: "2022-04-18",
    demoLink: "https://studybuddy.example.com",
  },
  {
    id: 8,
    name: "TechTalk",
    description: "Tech news aggregator",
    date: "2022-11-05",
    demoLink: "https://techtalk.example.com",
  },
  {
    id: 9,
    name: "FitTrack",
    description: "Fitness and workout tracker",
    date: "2022-03-22",
    demoLink: "https://fittrack.example.com",
  },
  {
    id: 10,
    name: "MindfulMoments",
    description: "Meditation and mindfulness app",
    date: "2022-02-14",
    demoLink: "https://mindfulmoments.example.com",
  },
];

import TechGalaxy from "../components/techGalaxy";
import About from "../components/about";
import Projects from "../components/projects";
import Contact from "../components/contact/Form";
import SportsGalaxy from "../components/sportsGalaxy";
import CreativeCorner from "../components/creativeCorner";
import MotivationMeteor from "../components/motivationMeteor";
import GeographyNebula from "../components/geographyNebula";
import HistoryConstellation from "../components/historyConstellation";
import AiUniverse from "../components/aiUniverse";

export const BtnList = [
  { label: "Tech Galaxy", link: "/techGalaxy", icon: "Rocket", newTab: false, component: TechGalaxy },
  { label: "Geography Nebula", link: "/geographyNebula", icon: "Earth", newTab: false, component: GeographyNebula },
  {
    label: "History Constellation",
    link: "/historyConstellation",
    icon: "History",
    newTab: false,
    component: HistoryConstellation,
  },
  { label: "AI Universe", link: "/aiUniverse", icon: "Brain", newTab: false, component: AiUniverse },
  {
    label: "Sports Galaxy",
    link: "/sportsGalaxy",
    icon: "Gamepad",
    newTab: false,
    component: SportsGalaxy,
  },
  {
    label: "Creative Corner",
    link: "/creativeCorner",
    icon: "CreativeCommons",
    newTab: false,
    component: CreativeCorner,
  },
  {
    label: "Motivation Meteor",
    link: "/motivationMeteor",
    icon: "Lightbulb",
    newTab: false,
    component: MotivationMeteor,
  },
  {
    label: "Community",
    link: "/contact",
    icon: "MessageCircle",
    newTab: false,
  },
];
