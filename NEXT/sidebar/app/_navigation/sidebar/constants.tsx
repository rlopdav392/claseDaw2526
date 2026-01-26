import { Home, Settings, User } from "lucide-react";
import { NavItem } from "./types";

export const navItems: NavItem[] = [
  {
    title: "Home",
    icon: <Home size={20} />,
    href: "/",
  },
  {
    title: "Settings",
    icon: <Settings size={20} />,
    href: "/settings",
  },
  {
    title: "Profile",
    icon: <User size={20} />,
    href: "/profile",
  },
];

export const closedClassName =
  "opacity-0  transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100 group-hover:text-background ";
