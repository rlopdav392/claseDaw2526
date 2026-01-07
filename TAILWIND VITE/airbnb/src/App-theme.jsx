import "./globals.css";
import { ThemeProvider } from "./components/theme/ThemeContext";
import { ThemeSwitcher } from "./components/theme/ThemeSwitcher";

function App() {
  return (
    <ThemeProvider>
      <div className="bg-background text-foreground min-h-screen flex items-center justify-center">
        <ThemeSwitcher />
      </div>
    </ThemeProvider>
  );
}

export default App;
