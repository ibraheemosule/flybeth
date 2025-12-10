"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Separator,
} from "@/components/ui";

import { motion } from "framer-motion";
import { User } from "lucide-react";

import { useRouter } from "next/navigation";

export default function BookingAccount({
  setStep,
}: {
  setStep: (step: number) => void;
}) {
  const router = useRouter();

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
      <Card className="border-2 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-6 w-6 text-[#2563eb]" />
            Account Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-6 rounded-xl bg-gradient-to-r from-[#2563eb]/5 to-[#10b981]/5 border border-[#2563eb]/10">
            <h3 className="mb-2">Already have an account?</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Sign in to access your saved preferences and earn rewards
            </p>
            <Button
              onClick={() => router.push("/signin")}
              className="w-full bg-gradient-to-r from-[#2563eb] to-[#10b981] hover:from-[#2563eb]/90 hover:to-[#10b981]/90"
            >
              Sign In
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <div className="p-6 rounded-xl border-2 border-dashed border-gray-300">
            <h3 className="mb-2">Continue as Guest</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Book quickly without creating an account
            </p>
            <Button
              onClick={() => setStep(2)}
              variant="outline"
              className="w-full border-2 hover:border-[#2563eb]"
            >
              Continue as Guest
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
