"use client";

import { useEffect } from "react";
import { useThemeStore } from "../stores";

export function ThemeInitializer() {
  const { currentTheme, isCustomTheme, customTheme } = useThemeStore();

  useEffect(() => {
    // Apply theme on client side only to avoid hydration mismatches
    const applyStoredTheme = () => {
      if (isCustomTheme && customTheme) {
        const root = document.documentElement;
        root.style.setProperty("--primary", customTheme.primary);
        root.style.setProperty("--accent", customTheme.accent);
        root.style.setProperty("--blue-primary", customTheme.primary);
        root.style.setProperty("--green-accent", customTheme.accent);
        root.style.setProperty(
          "--gradient-blue-green",
          `linear-gradient(135deg, ${customTheme.primary} 0%, ${customTheme.accent} 100%)`
        );
      } else {
        const colors = useThemeStore.getState().getCurrentColors();
        const root = document.documentElement;
        root.style.setProperty("--primary", colors.primary);
        root.style.setProperty(
          "--primary-foreground",
          colors.primaryForeground
        );
        root.style.setProperty("--accent", colors.accent);
        root.style.setProperty("--accent-foreground", colors.accentForeground);
        root.style.setProperty("--blue-primary", colors.primary);
        root.style.setProperty("--green-accent", colors.accent);
        root.style.setProperty(
          "--gradient-blue-green",
          `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`
        );
      }
    };

    // Only run on client
    if (typeof window !== "undefined") {
      applyStoredTheme();
    }
  }, [currentTheme, isCustomTheme, customTheme]);

  return null;
}
