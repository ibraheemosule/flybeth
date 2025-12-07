"use client";

import { SignInPage } from "../../components/SignInPage";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    switch (page) {
      case "home":
        router.push("/");
        break;
      case "signup":
        router.push("/signup");
        break;
      case "deals":
        router.push("/deals");
        break;
      case "trips":
        router.push("/trips");
        break;
      case "help":
        router.push("/help");
        break;
      default:
        router.push("/");
    }
  };

  return <SignInPage onNavigate={handleNavigate} />;
}
