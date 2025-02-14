import { Navbar } from "@/components/Navbar";
import { GridLayout } from "@/components/GridLayout";
import { SearchProvider } from "@/contexts/SearchContext";
import { getEvents } from "@/lib/api";
import type { TEvent } from "@/components/EventCard";

export default async function Home() {
  const events = (await getEvents()) as TEvent[];

  return (
    <SearchProvider>
      <main>
        <Navbar />
        <GridLayout initialEvents={events} />
      </main>
    </SearchProvider>
  );
}
