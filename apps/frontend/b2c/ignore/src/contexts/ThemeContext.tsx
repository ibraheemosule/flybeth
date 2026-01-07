import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ColorTheme = "blue-green" | "purple-orange" | "teal-coral" | "indigo-pink";

interface ThemeColors {
  primary: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
  name: string;
  description: string;
}

export const themeColors: Record<ColorTheme, ThemeColors> = {
  "blue-green": {
    primary: "#2563eb",
    primaryForeground: "#ffffff",
    accent: "#10b981",
    accentForeground: "#ffffff",
    name: "Ocean Breeze",
    description: "Professional blue with vibrant green accents",
  },
  "purple-orange": {
    primary: "#9333ea",
    primaryForeground: "#ffffff",
    accent: "#f97316",
    accentForeground: "#ffffff",
    name: "Sunset Vibes",
    description: "Rich purple with energetic orange accents",
  },
  "teal-coral": {
    primary: "#0d9488",
    primaryForeground: "#ffffff",
    accent: "#fb7185",
    accentForeground: "#ffffff",
    name: "Tropical Paradise",
    description: "Refreshing teal with warm coral accents",
  },
  "indigo-pink": {
    primary: "#4f46e5",
    primaryForeground: "#ffffff",
    accent: "#ec4899",
    accentForeground: "#ffffff",
    name: "Modern Fusion",
    description: "Bold indigo with playful pink accents",
  },
};

interface ThemeContextType {
  theme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
  themeColors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ColorTheme>("blue-green");

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("flybeth-theme") as ColorTheme;
    const customTheme = localStorage.getItem("flybeth-custom-theme");
    
    if (customTheme) {
      // Load custom theme
      try {
        const { primary, accent } = JSON.parse(customTheme);
        const root = document.documentElement;
        root.style.setProperty("--primary", primary);
        root.style.setProperty("--accent", accent);
        root.style.setProperty("--blue-primary", primary);
        root.style.setProperty("--green-accent", accent);
        root.style.setProperty(
          "--gradient-blue-green",
          `linear-gradient(135deg, ${primary} 0%, ${accent} 100%)`
        );
      } catch (e) {
        console.error("Failed to load custom theme", e);
      }
    } else if (savedTheme && themeColors[savedTheme]) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (newTheme: ColorTheme) => {
    const colors = themeColors[newTheme];
    const root = document.documentElement;
    
    // Update CSS custom properties
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--primary-foreground", colors.primaryForeground);
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--accent-foreground", colors.accentForeground);
    root.style.setProperty("--blue-primary", colors.primary);
    root.style.setProperty("--green-accent", colors.accent);
    root.style.setProperty(
      "--gradient-blue-green",
      `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`
    );
  };

  const setTheme = (newTheme: ColorTheme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("flybeth-theme", newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        themeColors: themeColors[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}