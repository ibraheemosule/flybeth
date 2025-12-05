"use client";

import { SignUpPage } from "../../components/SignUpPage";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    switch (page) {
      case "home":
        router.push("/");
        break;
      case "signin":
        router.push("/signin");
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

  return <SignUpPage onNavigate={handleNavigate} />;
}
