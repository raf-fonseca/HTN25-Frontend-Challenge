"use client";

import { Navbar } from "@/components/Navbar";
import { GridLayout } from "@/components/GridLayout";
import { SearchProvider } from "@/contexts/SearchContext";

export default function Home() {
  return (
    <SearchProvider>
      <main>
        <Navbar />
        <GridLayout />
      </main>
    </SearchProvider>
  );
}
