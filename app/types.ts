export type TEventType = "workshop" | "activity" | "tech_talk";
export type TPermission = "public" | "private";

export type TSpeaker = {
  name: string;
};

export type TEvent = {
  id: number;
  name: string;
  event_type: TEventType;
  permission?: TPermission;
  start_time: number;
  end_time: number;
  description?: string;
  speakers: TSpeaker[];
  public_url?: string;
  private_url: string;
  related_events: number[];
};

export const eventTypeStyles = {
  workshop: "bg-mint text-emerald-600",
  tech_talk: "bg-blue-light text-blue-600",
  activity: "bg-lavender text-purple-600",
} as const;
