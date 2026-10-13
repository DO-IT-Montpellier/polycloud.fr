export type Topic =
  | 'discovery'
  | 'cloud'
  | 'security'
  | 'ai'
  | 'infra'
  | 'data'
  | 'observability'
  | 'hardware'
  | 'tooling'
  | 'web';

export const topicLabels: Record<Topic, string> = {
  discovery: 'Découverte',
  cloud: 'Cloud',
  security: 'Sécurité',
  ai: 'IA & systèmes',
  infra: 'Infrastructure',
  data: 'Data',
  observability: 'Observabilité',
  hardware: 'Hardware',
  tooling: 'Outillage',
  web: 'Web & mobile',
};

/** Times are local "HH:MM" strings. */
type Slot = { start: string; end: string };

export type Break = Slot & { kind: 'break'; title: string };

export type Talk = Slot & {
  kind: 'talk';
  title: string;
  speakers: string[];
  /** Index into `Edition.rooms`; omitted for plenary sessions shown in every room. */
  room?: number;
  topic?: Topic;
  advanced?: boolean;
  keynote?: boolean;
  /** Replay URL on YouTube, added once the video is published. */
  video?: string;
};

export type Session = Break | Talk;

export type Sponsor = { name: string; href: string; logo: string };

export type SponsorTier = {
  id: 'gold' | 'silver' | 'bronze' | 'academic';
  title: string;
  sponsors: Sponsor[];
};

export type TeamMember = { name: string; role: string; linkedin?: string };

export type Edition = {
  year: number;
  /** ISO date, YYYY-MM-DD */
  date: string;
  ordinal: string;
  rooms: string[];
  /** false when the original programme did not name the rooms */
  roomsNamed: boolean;
  notes?: string[];
  sessions: Session[];
  /** Omitted when we don't have the data for that edition. */
  sponsors?: SponsorTier[];
  /** Organising team. Omitted when we don't have the data for that edition. */
  team?: TeamMember[];
};
