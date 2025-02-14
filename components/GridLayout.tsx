"use client";

import { useState } from "react";
import { type TEvent, type TEventType } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { mockEvents } from "@/lib/mock-data";
import { EventDetailsSidebar } from "./EventSidebar";
import { useAuth } from "@/contexts/AuthContext";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/contexts/SearchContext";

// Dynamic import EventCard with no SSR
const EventCard = dynamic(
  () => import("./EventCard").then((mod) => mod.EventCard),
  { ssr: false }
);

interface GridLayoutProps {
  initialEvents: TEvent[];
}

export function GridLayout({ initialEvents }: GridLayoutProps) {
  const { isLoggedIn } = useAuth();
  const { searchQuery } = useSearch();
  const [filter, setFilter] = useState<TEventType | null>(null);
  const [selectedTab, setSelectedTab] = useState<TEventType | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleFilterChange = (newFilter: TEventType | null) => {
    setSelectedTab(newFilter);
    setFilter(newFilter);
  };

  const handleEventClick = (clickedEvent: TEvent) => {
    setSelectedEvent(clickedEvent);
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
    setSelectedEvent(null);
  };

  const handleRelatedEventClick = (relatedEvent: TEvent) => {
    setSelectedEvent(relatedEvent);
  };

  // Replace mockEvents with initialEvents
  const sortedEvents = [...initialEvents].sort(
    (a, b) => a.start_time - b.start_time
  );

  const searchedAndFilteredEvents = sortedEvents.filter((event) => {
    const matchesSearch =
      event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter ? event.event_type === filter : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-12 relative overflow-x-auto sm:overflow-visible">
        <div className="flex rounded-xl bg-gradient-to-r from-[#E2E3FF] via-[#EDE4FF] to-[#E2E3FF] p-1.5 shadow-xl shadow-indigo-500/10">
          <Button
            variant="ghost"
            onClick={() => handleFilterChange(null)}
            className={`relative rounded-lg px-2 sm:px-6 transition-all duration-300 text-sm sm:text-base ${
              selectedTab === null
                ? "text-[#5046E5] bg-white shadow-md hover:text-[#5046E5] "
                : "text-[#8B8FFF] hover:text-[#5046E5]"
            }`}
          >
            {selectedTab === null && (
              <motion.div
                className="absolute inset-0 bg-white rounded-lg shadow-md"
                layoutId="active-tab"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">All</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleFilterChange("workshop")}
            className={`relative rounded-lg px-2 sm:px-6 transition-all duration-300 text-sm sm:text-base ${
              selectedTab === "workshop"
                ? "text-[#5046E5] bg-white shadow-md hover:text-[#5046E5]"
                : "text-[#8B8FFF] hover:text-[#5046E5] hover:bg-white/50"
            }`}
          >
            {selectedTab === "workshop" && (
              <motion.div
                className="absolute inset-0 bg-white rounded-lg shadow-md"
                layoutId="active-tab"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">Workshops</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleFilterChange("activity")}
            className={`relative rounded-lg px-2 sm:px-6 transition-all duration-300 text-sm sm:text-base ${
              selectedTab === "activity"
                ? "text-[#5046E5] bg-white shadow-md hover:text-[#5046E5]"
                : "text-[#8B8FFF] hover:text-[#5046E5] hover:bg-white/50"
            }`}
          >
            {selectedTab === "activity" && (
              <motion.div
                className="absolute inset-0 bg-white rounded-lg shadow-md"
                layoutId="active-tab"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">Activities</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleFilterChange("tech_talk")}
            className={`relative rounded-lg px-2 sm:px-6 transition-all duration-300 text-sm sm:text-base ${
              selectedTab === "tech_talk"
                ? "text-[#5046E5] bg-white shadow-md hover:text-[#5046E5]"
                : "text-[#8B8FFF] hover:text-[#5046E5] "
            }`}
          >
            {selectedTab === "tech_talk" && (
              <motion.div
                className="absolute inset-0 bg-white rounded-lg shadow-md"
                layoutId="active-tab"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">Tech Talks</span>
          </Button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={filter || "all"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {searchedAndFilteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <EventCard
                event={event as TEvent}
                onEventClick={handleEventClick}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <EventDetailsSidebar
        event={selectedEvent}
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
        allEvents={initialEvents as TEvent[]}
        onEventClick={handleRelatedEventClick}
      />
    </div>
  );
}
