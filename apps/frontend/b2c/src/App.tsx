import { useState } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { MyTripsPage } from "./components/MyTripsPage";
import { DealsPage } from "./components/DealsPage";
import { HelpPage } from "./components/HelpPage";
import { SupportPage } from "./components/SupportPage";
import { AboutPage } from "./components/AboutPage";
import { BlogsPage } from "./components/BlogsPage";
import { RefundPolicyPage } from "./components/RefundPolicyPage";
import { TermsPage } from "./components/TermsPage";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";
import { NotFoundPage } from "./components/NotFoundPage";
import { SignInPage } from "./components/SignInPage";
import { SignUpPage } from "./components/SignUpPage";
import { Footer } from "./components/Footer";
import { Toaster } from "@/components/ui";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleNavigate = (page: string, tab?: string) => {
    setCurrentPage(page);
    setActiveTab(tab);

    // If navigating to home with a specific tab, scroll to top first
    if (page === "home" && tab) {
      // First scroll to top immediately
      window.scrollTo({ top: 0, behavior: "auto" });
      // Then after a brief delay, ensure we're at the hero
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      // Normal scroll to top for other pages
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            isSignedIn={isSignedIn}
            onNavigate={handleNavigate}
            activeTab={activeTab}
          />
        );
      case "trips":
        return <MyTripsPage />;
      case "deals":
        return <DealsPage />;
      case "help":
        return <SupportPage />;
      case "support":
        return <SupportPage />;
      case "about":
        return <AboutPage />;
      case "blogs":
        return <BlogsPage />;
      case "refund-policy":
        return <RefundPolicyPage />;
      case "terms":
        return <TermsPage />;
      case "privacy-policy":
        return <PrivacyPolicyPage />;
      case "signin":
        return <SignInPage onNavigate={handleNavigate} />;
      case "signup":
        return <SignUpPage onNavigate={handleNavigate} />;
      case "404":
        return <NotFoundPage onNavigate={handleNavigate} />;
      default:
        return <NotFoundPage onNavigate={handleNavigate} />;
    }
  };

  const showHeaderFooter = !["signin", "signup", "404"].includes(currentPage);

  return (
    <div className="min-h-screen flex flex-col">
      {showHeaderFooter && (
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
      )}
      <main className={showHeaderFooter ? "flex-1" : ""}>{renderPage()}</main>
      {showHeaderFooter && <Footer onNavigate={handleNavigate} />}
      <Toaster />
    </div>
  );
}
