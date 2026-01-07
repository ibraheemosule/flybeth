import { useTheme } from "../contexts/ThemeContext";
import { Palette } from "lucide-react";
import { motion } from "motion/react";

export function ThemeIndicator() {
  const { themeColors } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-4 right-4 z-50 hidden lg:block"
    >
      <div className="bg-white/90 backdrop-blur-xl rounded-full px-4 py-2 shadow-lg border-2 border-primary/20 flex items-center gap-2">
        <div
          className="w-6 h-6 rounded-full shadow-md"
          style={{
            background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.accent} 100%)`,
          }}
        />
        <div className="flex flex-col">
          <p className="text-xs font-medium text-gray-900">{themeColors.name}</p>
          <p className="text-[10px] text-muted-foreground">Active Theme</p>
        </div>
        <Palette className="h-3 w-3 text-primary ml-1" />
      </div>
    </motion.div>
  );
}
