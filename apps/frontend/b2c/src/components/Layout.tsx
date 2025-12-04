import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores";
import { LogOut, Home, Plane, Calendar } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();

  const navigation: NavigationItem[] = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Book Trip", href: "/book-trip", icon: Plane },
    { name: "My Trips", href: "/trips", icon: Calendar },
  ];

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="flex items-center justify-center h-16 px-4 bg-primary-600">
          <h1 className="text-xl font-bold text-white">FlyBeth</h1>
        </div>

        <nav className="mt-8">
          <div className="px-4 mb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Navigation
            </p>
          </div>

          {navigation.map(item => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href as any}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary-50 text-primary-700 border-r-2 border-primary-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 w-64 p-4 bg-gray-50 border-t">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.profile?.firstName?.charAt(0)}
                  {user?.profile?.lastName?.charAt(0)}
                </span>
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {user?.profile?.firstName} {user?.profile?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-2 p-1 text-gray-400 hover:text-gray-600"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
