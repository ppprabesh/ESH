"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Sidebar } from "@/components/admin/sidebar";
import { Button } from "@/components/ui/button";
import { Menu as HamburgerIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
    setIsLoading(false);
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  // Close the sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      <div className="flex">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-0 overflow-hidden"
          } bg-[#F5F5DC] `}
        >
          <Sidebar />
        </div>

        <div className="flex-1">
          <nav className="bg-[#F5F5DC] ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                {/* Hamburger Button */}
                <Button
                  variant="ghost"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 flex items-center justify-center bg-white shadow-lg rounded-full hover:bg-gray-100"
                >
                  <HamburgerIcon className="h-6 w-6 text-gray-800" />
                </Button>

                {/* Logout Button */}
                <div className="flex items-center">
                  <button
                    onClick={handleLogout}
                    className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#000080] hover:bg-[#0000A0]"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
