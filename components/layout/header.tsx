"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store, Menu, ShoppingBag, X, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TopBar } from "./top-bar";
import Image from "next/image";

const routes = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setIsMobileMenuOpen(false);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <TopBar />
      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-[#F8F3D9] shadow-md" : "bg-[#F8F3D9]"
        )}
      >
        <div className="container mx-auto px-2">
          {/* Main Navigation */}
          <div className="flex items-center justify-between py-0">
            {/* Left side - Logo */}
            <div className="w-1/4">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/images/logo/eshlogo.png"
                  alt="logo"
                  width={60}
                  height={60}
                />
                <span className="font-bold text-2xl text-[#000080 ]">
                  Everest Souvenir House
                </span>
              </Link>
            </div>

            {/* Center - Navigation Links */}
            <nav className="hidden md:flex items-center justify-center w-1/2">
              <div className="flex items-center gap-8">
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-[#000080]",
                      pathname === route.path
                        ? "text-[#000080 "
                        : "text-[#000080]/80"
                    )}
                  >
                    {route.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center justify-end w-1/4 gap-4">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="h-5 w-5 text-[#000080]" />
              </Button>
              
              {/* Mobile Menu Button with Dropdown */}
              <div className="relative md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Menu className="h-6 w-6 text-[#000080]" />
                </Button>
                
                {/* Compact Mobile Dropdown */}
                {isMobileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#F8F3D9] rounded-md shadow-lg border border-[#000080 ]/20 z-50 transition-all duration-300 origin-top-right">
                    <nav className="flex flex-col p-2">
                      {routes.map((route) => (
                        <Link
                          key={route.path}
                          href={route.path}
                          className={cn(
                            "px-4 py-2 text-lg font-medium transition-colors hover:bg-[#000080 ]/10 rounded",
                            pathname === route.path
                              ? "text-[#000080]"
                              : "text-[#000080]/80"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {route.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}