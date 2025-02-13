"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  Users,
  ExternalLink,
  Lock,
  Wrench,
  Lightbulb,
  Rocket,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TEvent } from "./EventCard";
import { RelatedEvents } from "./RelatedEvents";
import { eventTypeStyles } from "@/app/types";

const eventTypeConfig = {
  workshop: { icon: Wrench, color: "text-emerald-600", bgColor: "bg-mint" },
  tech_talk: {
    icon: Lightbulb,
    color: "text-blue-600",
    bgColor: "bg-blue-light",
  },
  activity: { icon: Rocket, color: "text-purple-600", bgColor: "bg-lavender" },
};

type EventDetailsSidebarProps = {
  event: TEvent | null;
  isOpen: boolean;
  onClose: () => void;
  allEvents: TEvent[];
};

export function EventDetailsSidebar({
  event: initialEvent,
  isOpen,
  onClose,
  allEvents,
}: EventDetailsSidebarProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [event, setEvent] = useState<TEvent | null>(initialEvent);

  useEffect(() => {
    setEvent(initialEvent);
  }, [initialEvent]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen, onClose]);

  if (!event) return null;

  const isRestricted = event.permission === "private" && !isLoggedIn;

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const EventTypeIcon =
    eventTypeConfig[event.event_type as keyof typeof eventTypeConfig].icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-xl z-50 overflow-y-auto"
          >
            <Card className="h-full border-none rounded-none">
              <CardHeader className="sticky top-0 z-50 bg-background pb-4 pt-6">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4"
                  onClick={onClose}
                >
                  <X className="h-6 w-6" />
                </Button>
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-full ${
                      eventTypeConfig[
                        event.event_type as keyof typeof eventTypeConfig
                      ].bgColor
                    }`}
                  >
                    <EventTypeIcon
                      className={`h-8 w-8 ${
                        eventTypeConfig[
                          event.event_type as keyof typeof eventTypeConfig
                        ].color
                      }`}
                    />
                  </div>
                  <div>
                    <Badge
                      className={`font-medium mb-2 ${
                        eventTypeStyles[event.event_type]
                      }`}
                    >
                      {event.event_type.replace("_", " ")}
                    </Badge>
                    <CardTitle className="text-2xl font-bold">
                      {event.name}
                    </CardTitle>
                  </div>
                </div>
                {event.permission === "private" && (
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                    <Lock className="h-3 w-3 mr-1" />
                    Private
                  </div>
                )}
              </CardHeader>
              <CardContent className="pt-4">
                {isRestricted ? (
                  <div className="text-center py-12">
                    <Lock className="h-24 w-24 mx-auto text-primary mb-4" />
                    <p className="text-lg font-medium text-gray-600 mb-4">
                      This is a private event
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col space-y-4 mb-6 text-gray-600">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2" />
                        <span>{formatTime(event.start_time)}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        <span>
                          {event.speakers
                            .map((speaker: any) => speaker.name)
                            .join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="prose max-w-none">
                      <h3 className="text-xl font-semibold mb-2">
                        About this event
                      </h3>
                      <p className="text-gray-700">{event.description}</p>
                    </div>
                    <RelatedEvents
                      eventIds={event.related_events}
                      events={allEvents}
                      onEventClick={(relatedEvent) => {
                        setEvent(relatedEvent);
                        window.scrollTo(0, 0);
                      }}
                    />
                  </>
                )}
              </CardContent>
              {!isRestricted && (
                <CardFooter className="flex justify-between bg-gray-50 mt-6 sticky bottom-0">
                  <Button
                    className="bg-[#8B8FFF] hover:bg-[#7A7EFF] text-white transition-all duration-300 shadow-md hover:shadow-lg"
                    size="lg"
                    asChild
                  >
                    <a
                      href={event.private_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Event
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  {event.public_url && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-primary border-primary hover:bg-primary/10"
                      asChild
                    >
                      <a
                        href={event.public_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Public Info
                      </a>
                    </Button>
                  )}
                </CardFooter>
              )}
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
