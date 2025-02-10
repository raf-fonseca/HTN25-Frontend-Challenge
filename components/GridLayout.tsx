"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
export type TEventType = "workshop" | "activity" | "tech_talk";

export function GridLayout() {
  const [filter, setFilter] = useState<TEventType | null>(null);
  const [selectedTab, setSelectedTab] = useState<TEventType | null>(null);

  const handleFilterChange = (newFilter: TEventType | null) => {
    setSelectedTab(newFilter);
    setFilter(newFilter);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center space-x-4 mb-12 relative">
        <div className="flex rounded-xl bg-gradient-to-r from-[#E2E3FF] via-[#EDE4FF] to-[#E2E3FF] p-1.5 shadow-xl shadow-indigo-500/10">
          <Button
            variant="ghost"
            onClick={() => handleFilterChange(null)}
            className={`relative rounded-lg px-6 transition-all duration-300 ${
              selectedTab === null
                ? "text-[#8B8FFF] bg-white shadow-md"
                : "text-indigo-600 hover:text-[#8B8FFF] hover:bg-white/50"
            }`}
          >
            {selectedTab === null && (
              <motion.div
                className="absolute inset-0 bg-white rounded-lg shadow-md"
                layoutId="active-tab"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            <span className="relative z-10">All Events</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleFilterChange("workshop")}
            className={`relative rounded-lg px-6 transition-all duration-300 ${
              selectedTab === "workshop"
                ? "text-[#8B8FFF] bg-white shadow-md"
                : "text-indigo-600 hover:text-[#8B8FFF] hover:bg-white/50"
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
            className={`relative rounded-lg px-6 transition-all duration-300 ${
              selectedTab === "activity"
                ? "text-[#8B8FFF] bg-white shadow-md"
                : "text-indigo-600 hover:text-[#8B8FFF] hover:bg-white/50"
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
            className={`relative rounded-lg px-6 transition-all duration-300 ${
              selectedTab === "tech_talk"
                ? "text-[#8B8FFF] bg-white shadow-md"
                : "text-indigo-600 hover:text-[#8B8FFF] hover:bg-white/50"
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
    </div>
  );
}
