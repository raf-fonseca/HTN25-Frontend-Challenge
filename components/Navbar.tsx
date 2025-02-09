"use client"

import { useState, useEffect, useCallback } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function Navbar() {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true)
  }, [])

  const handleSearchBlur = useCallback(() => {
    setIsSearchFocused(false)
  }, [])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
      event.preventDefault()
      const searchInput = document.getElementById("search-input") as HTMLInputElement
      if (searchInput) {
        searchInput.focus()
      }
    }
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold">Logo</span>
          </div>
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs relative">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                  id="search-input"
                  className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <span className="text-xs text-gray-400 bg-gray-100 rounded px-1 py-0.5">⌘K</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
      {isSearchFocused && (
        <div className="absolute inset-x-0 top-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="p-4 text-sm text-gray-700">Search results will appear here...</div>
        </div>
      )}
    </nav>
  )
}

