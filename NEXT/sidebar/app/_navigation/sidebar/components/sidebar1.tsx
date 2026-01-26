"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { navItems } from "../constants";
import { SidebarItem } from "./sidebar-item1";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setOpen] = useState(false);
  const [isTransition, setTransition] = useState(false);

  const handleToggle = (open: boolean) => {
    setTransition(true);
    setOpen(open);
    setTimeout(() => setTransition(false), 200);
  };

  return (
    <nav
      className={clsx(
        "h-screen border-r bg-background pt-20",
        "transition-all",
        isTransition && "duration-200",
        isOpen ? "w-60" : "w-20",
      )}
      /*  onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)} */
      onClick={() => {
        handleToggle(!isOpen);
      }}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {navItems.map((navItem) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              isActive={pathname === navItem.href}
              navItem={navItem}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
};

export { Sidebar };
