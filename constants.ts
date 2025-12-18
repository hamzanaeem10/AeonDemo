import { NavItem, UseCase } from './types';

export const APP_NAME = "Aeon";

export const NAV_ITEMS: NavItem[] = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Preview", href: "#demo" },
];

export const USE_CASES: UseCase[] = [
  {
    title: "Music Practice",
    description: "Play along with any track. Remove the original drums to practice your groove, or isolate the solo to learn every note.",
    icon: "practice"
  },
  {
    title: "Ear Training",
    description: "Hear bass lines and inner harmonies clearly. Perfect for transcription.",
    icon: "ear_training"
  },
  {
    title: "Teaching",
    description: "Create instant listening examples for students. Show, don't just tell.",
    icon: "education"
  },
  {
    title: "Analysis",
    description: "Understand arrangement structures layer by layer.",
    icon: "analysis"
  },
  {
    title: "Exploration",
    description: "Discover textures hidden in the mix. Crowd noise, foley, acoustics.",
    icon: "exploration"
  }
];

export const MOCK_WAVEFORM_DATA = Array.from({ length: 100 }, (_, i) => ({
  index: i,
  value: Math.sin(i * 0.2) * Math.random() * 50 + 50
}));