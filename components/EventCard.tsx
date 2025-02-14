"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, ExternalLink, Lock, Unlock } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { eventTypeStyles } from "@/app/types";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/LoginModal";
import { formatEventTime } from "@/lib/utils";
import type { TEvent } from "@/app/types";

interface EventCardProps {
  event: TEvent;
  onEventClick: (event: TEvent) => void;
}

export function EventCard({ event, onEventClick }: EventCardProps) {
  const { isLoggedIn } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const isRestricted = event.permission === "private" && !isLoggedIn;

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="group hover:shadow-lg transition-all duration-300 border border-[1px] backdrop-blur-sm bg-gradient-to-br from-mint/30 to-blue-light/50 h-[280px] flex flex-col">
        <CardHeader className="relative">
          <div className="absolute -top-2 -left-2 bg-white rounded-full p-2 shadow-md">
            {event.permission === "private" ? (
              <Lock className="h-5 w-5 text-primary" />
            ) : (
              <Unlock className="h-5 w-5 text-green-500" />
            )}
          </div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="font-display text-xl mb-2 line-clamp-1">
                {event.name}
              </CardTitle>
              <div className="space-x-2">
                <Badge
                  className={`font-medium ${eventTypeStyles[event.event_type]}`}
                >
                  {event.event_type.replace("_", " ")}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          {isRestricted ? (
            <div className="flex flex-col justify-center h-full">
              <Lock className="h-5 w-5 mx-auto text-primary mb-4" />
              <p className="text-sm font-medium text-gray-600 text-center px-4">
                Please login to view private event details
              </p>
            </div>
          ) : (
            <div className="h-full flex flex-col gap-1">
              <div className="space-y-1">
                <div className="text-sm text-text-secondary font-bold">
                  {formatEventTime(event.start_time).date}
                </div>
                <div className="flex items-center text-sm text-text-secondary">
                  <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
                  {formatEventTime(event.start_time).time} -{" "}
                  {formatEventTime(event.end_time).time}
                </div>
              </div>
              {event.speakers && event.speakers.length > 0 && (
                <div className="flex items-center text-sm text-text-secondary">
                  <Users className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="line-clamp-1">
                    {event.speakers.map((speaker) => speaker.name).join(", ")}
                  </span>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between mt-auto">
          {isRestricted ? (
            <>
              <Button
                variant="outline"
                onClick={() => setIsLoginModalOpen(true)}
                className="w-full"
              >
                Log in to view
              </Button>
              <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
              />
            </>
          ) : (
            <>
              <Button
                className="bg-[#8B8FFF] hover:bg-[#7A7EFF] text-white transition-all duration-300 shadow-[0_0_0_0_rgba(139,143,255,0)] hover:shadow-[0_0_0_4px_rgba(139,143,255,0.1)]"
                size="sm"
                onClick={() => onEventClick(event)}
              >
                View Details
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default EventCard;
