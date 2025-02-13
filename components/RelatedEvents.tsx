import { EventCard, type TEvent } from "./EventCard";

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
      <div className="flex flex-col space-y-6">
        {relatedEvents.map((event) => (
          <EventCard key={event.id} event={event} onEventClick={onEventClick} />
        ))}
      </div>
    </div>
  );
}
