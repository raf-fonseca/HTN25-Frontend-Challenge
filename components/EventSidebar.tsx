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
import { LoginModal } from "./LoginModal";
import { useAuth } from "@/contexts/AuthContext";
import { formatEventTime } from "@/lib/utils";
import { usePreventScroll } from "@/hooks/usePreventScroll";

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
  onEventClick: (event: TEvent) => void;
};

export function EventDetailsSidebar({
  event: initialEvent,
  isOpen,
  onClose,
  allEvents,
  onEventClick,
}: EventDetailsSidebarProps) {
  const { isLoggedIn } = useAuth();
  const [event, setEvent] = useState<TEvent | null>(initialEvent);

  usePreventScroll(isOpen);

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
            className="fixed right-0 top-0 h-full w-full sm:w-[80%] md:w-[60%] lg:w-[45%] xl:w-[35%] bg-background shadow-xl z-50 overflow-y-auto"
          >
            <Card className="h-full border-none rounded-none flex flex-col">
              <div className="sticky top-0 z-50">
                <CardHeader className="bg-background/80 backdrop-blur-sm border-b border-gray-100 shadow-sm pb-4 pt-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#E2E3FF]/20 via-[#EDE4FF]/20 to-[#E2E3FF]/20" />
                  <div className="relative z-10">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -right-2 -top-2"
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
                  </div>
                </CardHeader>
              </div>
              <CardContent className="pt-4 flex-1">
                {event.permission === "private" && !isLoggedIn ? (
                  <LoginModal isOpen={true} onClose={onClose} />
                ) : (
                  <>
                    <div className="flex flex-col space-y-2">
                      <div className="space-y-2">
                        <div className="text-xl font-bold text-gray-900">
                          {formatEventTime(event.start_time).date}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-5 w-5 mr-2" />
                          {formatEventTime(event.start_time).time} -{" "}
                          {formatEventTime(event.end_time).time}
                        </div>
                      </div>

                      {event.speakers && event.speakers.length > 0 && (
                        <div className="flex items-center text-gray-600">
                          <Users className="h-5 w-5 mr-2" />
                          <span>
                            {event.speakers
                              .map((speaker) => speaker.name)
                              .join(", ")}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="prose max-w-none mt-8">
                      <h3 className="text-xl font-semibold mb-2">
                        About this event
                      </h3>
                      <p className="text-gray-700">{event.description}</p>
                    </div>

                    <RelatedEvents
                      eventIds={event.related_events}
                      events={allEvents}
                      onEventClick={onEventClick}
                    />
                  </>
                )}
              </CardContent>
              <CardFooter className="flex justify-between pt-4 sticky bottom-0 bg-background/80 backdrop-blur-sm border-t border-gray-100 shadow-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-[#E2E3FF]/20 via-[#EDE4FF]/20 to-[#E2E3FF]/20" />
                <div className="relative z-10 flex w-full justify-between">
                  <Button
                    className="bg-[#8B8FFF] hover:bg-[#7A7EFF] text-white transition-all duration-300 shadow-md hover:shadow-lg"
                    size="lg"
                    asChild
                  >
                    <a
                      href={event.public_url || event.private_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {event.public_url ? "View Video" : "Hacker Info"}
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
                        href={event.private_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Hacker Info
                      </a>
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
