import { Navbar } from "@/components/Navbar";
import { GridLayout } from "@/components/GridLayout";
import { SearchProvider } from "@/contexts/SearchContext";
import { getEvents } from "@/lib/api";
import type { TEvent } from "@/app/types";

export default async function Home() {
  try {
    const events = (await getEvents()) as TEvent[];

    return (
      <SearchProvider>
        <main>
          <Navbar />
          <GridLayout initialEvents={events} />
        </main>
      </SearchProvider>
    );
  } catch (error) {
    // Add proper error handling
    console.error("Error fetching events:", error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Failed to load events</p>
      </div>
    );
  }
}
