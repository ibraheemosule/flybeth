import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { motion } from "motion/react";
import { Palette, Check, X } from "lucide-react";
import { useTheme, ColorTheme, themeColors } from "../contexts/ThemeContext";

interface ThemeSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThemeSettingsModal({ isOpen, onClose }: ThemeSettingsModalProps) {
  const { theme: currentTheme, setTheme } = useTheme();

  const handleThemeSelect = (theme: ColorTheme) => {
    setTheme(theme);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-xl border-2 border-primary/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Palette className="h-6 w-6 text-primary" />
            Color Theme Settings
          </DialogTitle>
          <DialogDescription>
            Choose your preferred color scheme to personalize your Flybeth experience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Theme Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(Object.keys(themeColors) as ColorTheme[]).map((themeKey) => {
              const themeData = themeColors[themeKey];
              const isSelected = currentTheme === themeKey;

              return (
                <motion.button
                  key={themeKey}
                  onClick={() => handleThemeSelect(themeKey)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative p-5 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-lg"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                  }`}
                >
                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  )}

                  {/* Color Preview */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-lg shadow-md"
                      style={{
                        background: `linear-gradient(135deg, ${themeData.primary} 0%, ${themeData.accent} 100%)`,
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{themeData.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {themeData.description}
                      </p>
                    </div>
                  </div>

                  {/* Color Swatches */}
                  <div className="flex gap-2">
                    <div className="flex-1 space-y-1">
                      <div
                        className="h-6 rounded"
                        style={{ backgroundColor: themeData.primary }}
                      />
                      <p className="text-[10px] text-muted-foreground text-center">Primary</p>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div
                        className="h-6 rounded"
                        style={{ backgroundColor: themeData.accent }}
                      />
                      <p className="text-[10px] text-muted-foreground text-center">Accent</p>
                    </div>
                  </div>

                  {/* Sample Gradient Button Preview */}
                  <div className="mt-3">
                    <div
                      className="h-8 rounded-lg flex items-center justify-center text-white text-xs font-medium"
                      style={{
                        background: `linear-gradient(135deg, ${themeData.primary} 0%, ${themeData.accent} 100%)`,
                      }}
                    >
                      Sample Button
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <Separator />

          {/* Info Section */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
            <div className="flex items-start gap-3">
              <Palette className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-1 text-sm">
                <p className="font-medium">About Theme Customization</p>
                <p className="text-muted-foreground text-xs">
                  Your selected theme will be applied across the entire Flybeth platform and saved
                  to your browser. All gradients, buttons, and accent colors will update to match
                  your choice. You can change your theme anytime from the settings menu.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-2 hover:border-primary"
            >
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
