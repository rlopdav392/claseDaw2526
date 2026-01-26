import Link from "next/link";
import { clsx } from "clsx";
import { closedClassName } from "../constants";
import { NavItem } from "../types";

type SidebarItemProps = {
  isOpen: boolean;
  isActive: boolean;
  navItem: NavItem;
};

const SidebarItem = ({ isOpen, isActive, navItem }: SidebarItemProps) => {
  if (navItem.separator) {
    return <div className="my-2 border-t" />;
  }

  return (
    <Link href={navItem.href}>
      <div
        className={clsx(
          "group flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200",
          isActive
            ? "bg-foreground text-background"
            : "hover:bg-muted text-foreground",
        )}
      >
        <div className="shrink-0">{navItem.icon}</div>
        <span
          className={clsx(
            "whitespace-nowrap text-sm font-medium",
            !isOpen && closedClassName,
          )}
        >
          {navItem.title}
        </span>
      </div>
    </Link>
  );
};

export { SidebarItem };
