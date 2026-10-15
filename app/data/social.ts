import {
  BiLinkExternal,
  BiLogoGithub,
  BiLogoLinkedinSquare,
} from "react-icons/bi";
import { FiInstagram } from "react-icons/fi";

export const socialLinks = [
  {
    id: 1,
    name: "GitHub",
    url: "https://github.com/ZakariaMirinioui",
    icon: BiLogoGithub,
    status: "social",
  },
  {
    id: 2,
    name: "Instagram",
    url: "https://www.instagram.com/zakaria_mirinioui/",
    icon: FiInstagram,
    status: "social",
  },
  {
    id: 3,
    name: "Linkedin",
    url: "https://linkedin.com/in/zakaria-mirinioui",
    icon: BiLogoLinkedinSquare,
    status: "social",
  },
  {
    id: 4,
    name: "Email",
    url: "mailto:zakmirinioui@gmail.com",
    icon: BiLinkExternal,
    status: "contact",
  },
];
