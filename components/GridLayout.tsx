"use client";

import { useState } from "react";
import {
  EventCard,
  type TEvent,
  type TEventType,
} from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const mockEvents: TEvent[] = [
  {
    id: 1,
    name: "Intro to React",
    event_type: "workshop",
    permission: "private",
    start_time: Date.now() + 3600000,
    end_time: Date.now() + 7200000,
    description: "Learn the basics of React in this hands-on workshop.",
    speakers: [{ name: "Jane Doe" }],
    private_url: "https://example.com/react-workshop",
    related_events: [],
  },
  {
    id: 2,
    name: "AI Ethics Panel",
    event_type: "tech_talk",
    permission: "public",
    start_time: Date.now() + 10800000,
    end_time: Date.now() + 14400000,
    description: "Discussing the ethical implications of AI in today's world. ",
    speakers: [{ name: "John Smith" }, { name: "Alice Johnson" }],
    public_url: "https://example.com/ai-ethics-public",
    private_url: "https://example.com/ai-ethics-private",
    related_events: [1],
  },
  {
    id: 3,
    name: "Hackathon Kickoff",
    event_type: "activity",
    start_time: Date.now(),
    end_time: Date.now() + 1800000,
    description: "Get ready for 48 hours of coding and innovation!",
    speakers: [{ name: "Bob Wilson" }],
    private_url: "https://example.com/hackathon-kickoff",
    related_events: [],
  },
];

export function GridLayout() {
  const [filter, setFilter] = useState<TEventType | null>(null);
  const [selectedTab, setSelectedTab] = useState<TEventType | null>(null);

  const handleFilterChange = (newFilter: TEventType | null) => {
    setSelectedTab(newFilter);
    setFilter(newFilter);
  };

  const filteredEvents = filter
    ? mockEvents.filter((event) => event.event_type === filter)
    : mockEvents;

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
          {filteredEvents.map((event, index) => (
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
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
