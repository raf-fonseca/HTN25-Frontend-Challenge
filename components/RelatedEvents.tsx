import { RelatedEventCard } from "./RelatedEventCard";
import type { TEvent } from "./EventCard";

interface RelatedEventsProps {
  eventIds: number[];
  events: TEvent[];
  onEventClick: (event: TEvent) => void;
}

export function RelatedEvents({
  eventIds,
  events,
  onEventClick,
}: RelatedEventsProps) {
  if (!eventIds.length) return null;

  const relatedEvents = events.filter((event) => eventIds.includes(event.id));

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Related Events</h3>
      <div className="grid gap-4">
        {relatedEvents.map((event) => (
          <RelatedEventCard
            key={event.id}
            event={event}
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
}
