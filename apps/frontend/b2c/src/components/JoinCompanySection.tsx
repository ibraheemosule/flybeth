"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Users, Plus, X, UserPlus, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

interface JoinCompanySectionProps {
  userCompany: string | null;
  onJoinCompany: (companyName: string) => void;
  onLeaveCompany: () => void;
}

export function JoinCompanySection({
  userCompany,
  onJoinCompany,
  onLeaveCompany,
}: JoinCompanySectionProps) {
  const [inviteCode, setInviteCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinCompany = () => {
    if (!inviteCode.trim()) {
      toast.error("Please enter an invite code");
      return;
    }

    setIsJoining(true);

    // Simulate API call
    setTimeout(() => {
      // Mock successful join
      const mockCompanyName = `Company ${inviteCode.toUpperCase()}`;
      localStorage.setItem("flybeth-user-company-membership", mockCompanyName);
      onJoinCompany(mockCompanyName);
      setInviteCode("");
      setIsJoining(false);
      toast.success(`Successfully joined ${mockCompanyName}!`);
    }, 1500);
  };

  const handleLeaveCompany = () => {
    localStorage.removeItem("flybeth-user-company-membership");
    onLeaveCompany();
    toast.success("Left company successfully");
  };

  return (
    <div className="space-y-6">
      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-[#2563eb]" />
          Company Membership
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Join your company to access business travel features and shared
          bookings
        </p>
      </div>

      {userCompany ? (
        /* Already in a company */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-gradient-to-r from-[#2563eb]/10 to-[#10b981]/10 border border-[#2563eb]/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#2563eb]/10">
                <Users className="h-5 w-5 text-[#2563eb]" />
              </div>
              <div>
                <p className="font-medium">{userCompany}</p>
                <p className="text-sm text-muted-foreground">Company Member</p>
              </div>
              <Badge className="bg-[#10b981] text-white">Active</Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLeaveCompany}
              className="text-destructive border-destructive hover:bg-destructive/5"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Leave
            </Button>
          </div>
        </motion.div>
      ) : (
        /* Not in a company - show join form */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <UserPlus className="h-5 w-5 text-[#2563eb]" />
              <span className="font-medium">Join Company</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Enter the invite code provided by your company administrator
            </p>

            <div className="space-y-3">
              <div>
                <Label htmlFor="inviteCode" className="text-sm">
                  Company Invite Code
                </Label>
                <Input
                  id="inviteCode"
                  value={inviteCode}
                  onChange={e => setInviteCode(e.target.value.toUpperCase())}
                  placeholder="ABC123"
                  className="mt-1 font-mono"
                  maxLength={10}
                />
              </div>

              <Button
                onClick={handleJoinCompany}
                disabled={isJoining || !inviteCode.trim()}
                className="w-full bg-gradient-to-r from-[#2563eb] to-[#10b981] text-white hover:opacity-90"
              >
                {isJoining ? (
                  <>
                    <motion.div
                      className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Joining...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Join Company
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            Don't have an invite code? Contact your company administrator
          </div>
        </motion.div>
      )}
    </div>
  );
}
