import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ColorTheme =
  | "blue-green"
  | "purple-orange"
  | "teal-coral"
  | "indigo-pink";

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

interface CustomTheme {
  primary: string;
  accent: string;
}

// Simple function to apply theme to DOM (client-side only)
const applyTheme = (colors: ThemeColors) => {
  if (typeof window === "undefined") return;

  const root = document.documentElement;
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

const applyCustomTheme = (custom: CustomTheme) => {
  if (typeof window === "undefined") return;

  const root = document.documentElement;
  root.style.setProperty("--primary", custom.primary);
  root.style.setProperty("--accent", custom.accent);
  root.style.setProperty("--blue-primary", custom.primary);
  root.style.setProperty("--green-accent", custom.accent);
  root.style.setProperty(
    "--gradient-blue-green",
    `linear-gradient(135deg, ${custom.primary} 0%, ${custom.accent} 100%)`
  );
};

interface ThemeState {
  // State
  currentTheme: ColorTheme;
  isCustomTheme: boolean;
  customTheme: CustomTheme | null;

  // Actions
  setTheme: (theme: ColorTheme) => void;
  setCustomTheme: (custom: CustomTheme) => void;
  resetToPresetTheme: (theme: ColorTheme) => void;

  // Getters
  getCurrentColors: () => ThemeColors;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentTheme: "blue-green",
      isCustomTheme: false,
      customTheme: null,

      // Actions
      setTheme: (theme: ColorTheme) => {
        const colors = themeColors[theme];
        applyTheme(colors);

        set({
          currentTheme: theme,
          isCustomTheme: false,
          customTheme: null,
        });
      },

      setCustomTheme: (custom: CustomTheme) => {
        applyCustomTheme(custom);

        set({
          isCustomTheme: true,
          customTheme: custom,
        });
      },

      resetToPresetTheme: (theme: ColorTheme) => {
        const colors = themeColors[theme];
        applyTheme(colors);

        set({
          currentTheme: theme,
          isCustomTheme: false,
          customTheme: null,
        });
      },

      // Getters
      getCurrentColors: () => {
        const state = get();

        if (state.isCustomTheme && state.customTheme) {
          return {
            primary: state.customTheme.primary,
            primaryForeground: "#ffffff",
            accent: state.customTheme.accent,
            accentForeground: "#ffffff",
            name: "Custom Theme",
            description: "Your personalized color scheme",
          };
        }

        return themeColors[state.currentTheme];
      },
    }),
    {
      name: "flybeth-theme-storage",
    }
  )
);
