import { LucideMoon, LucideSun } from "lucide-react";
import { useTheme } from "./useTheme";
import { Button } from "../ui/Button";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative"
    >
      <LucideMoon
        className={`
          absolute h-4 w-4 transition-all duration-500 ease-in-out
          ${isDark ? "rotate-[-45deg] opacity-0" : "rotate-0 opacity-100"}
        `}
      />
      <LucideSun
        className={`
          absolute h-4 w-4 transition-all duration-500 ease-in-out
          ${isDark ? "rotate-0 opacity-100" : "rotate-[45deg] opacity-0"}
        `}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
