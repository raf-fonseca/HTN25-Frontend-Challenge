import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, ExternalLink, Lock, Unlock } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { eventTypeStyles } from "@/app/types";
import type { TEvent } from "./EventCard";

interface RelatedEventCardProps {
  event: TEvent;
  onEventClick: (event: TEvent) => void;
}

export function RelatedEventCard({
  event,
  onEventClick,
}: RelatedEventCardProps) {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
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
        <div className="h-full flex flex-col">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-text-secondary">
              <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
              {formatTime(event.start_time)} - {formatTime(event.end_time)}
            </div>
            <div className="flex items-center text-sm text-text-secondary">
              <Users className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="line-clamp-1">
                {event?.speakers?.map((speaker) => speaker?.name).join(", ")}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between mt-auto">
        <Button
          className="bg-[#8B8FFF] hover:bg-[#7A7EFF] text-white transition-all duration-300 shadow-[0_0_0_0_rgba(139,143,255,0)] hover:shadow-[0_0_0_4px_rgba(139,143,255,0.1)]"
          size="sm"
          onClick={() => onEventClick(event)}
        >
          View Details
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
