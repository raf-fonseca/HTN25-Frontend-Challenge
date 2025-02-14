"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LoginModal } from "./LoginModal";
import { toast } from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";
import dynamic from "next/dynamic";
import { useSearch } from "@/contexts/SearchContext";

// Dynamic import with no SSR
const LoginButton = dynamic(
  () => import("./LoginButton").then((mod) => mod.LoginButton),
  {
    ssr: false,
  }
);

export function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    setIsSearchFocused(false);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
      event.preventDefault();
      const searchInput = document.getElementById(
        "search-input"
      ) as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleLoginClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      toast.success("Successfully logged out!");
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <nav className="bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="hidden sm:flex w-[200px] items-center">
            <Image
              src="https://hackthenorth.com/favicon.ico"
              alt="Hack the North Logo"
              width={32}
              height={32}
            />
          </div>
          <div className="flex-1 max-w-xl w-full sm:w-auto ">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <Input
                id="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-16 py-2 bg-white/50 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Search events..."
                type="search"
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <span className="text-xs text-gray-500 bg-secondary px-2 py-1 rounded-md font-medium">
                  ⌘K
                </span>
              </div>
            </div>
          </div>
          <div className="w-auto sm:w-[200px] flex justify-end font-semibold rounded-full">
            <LoginButton onClick={handleLoginClick} />
          </div>
        </div>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </nav>
  );
}
