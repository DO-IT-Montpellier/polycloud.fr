import type { Edition, Session, Talk } from './types';
import e2022 from './2022';
import e2023 from './2023';
import e2024 from './2024';
import e2025 from './2025';
import e2026 from './2026';

export * from './types';

/** Newest first. The first one is the edition the site is about: add the next one on top to switch to it. */
export const editions: Edition[] = [e2026, e2025, e2024, e2023, e2022];
export const currentEdition = editions[0];

/**
 * Today in Paris, as YYYY-MM-DD. Evaluated at build time: the site is rebuilt daily to stay current.
 * Set POLYCLOUD_TODAY=YYYY-MM-DD to preview the site as of another day.
 */
export const today =
  process.env.POLYCLOUD_TODAY ||
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date());

export type Phase = 'upcoming' | 'today' | 'ended';

export const phaseOf = (e: Edition): Phase =>
  today < e.date ? 'upcoming' : today === e.date ? 'today' : 'ended';

/** Where the current edition stands, which drives the wording across the site. */
export const phase = phaseOf(currentEdition);

/** 1 for the first edition, counting every edition listed. */
export const numberOf = (e: Edition) => editions.length - editions.indexOf(e);

/** First and last time of the day, or null while the programme isn't published. */
export function hoursOf(e: Edition) {
  if (e.sessions.length === 0) return null;
  const starts = e.sessions.map((s) => s.start).sort();
  const ends = e.sessions.map((s) => s.end).sort();
  return { start: starts[0], end: ends[ends.length - 1] };
}

export type CfpStatus = 'soon' | 'open' | 'closed';

/** Null when the edition has no CFP data. Closes on its closing date, or at the latest once the event starts. */
export function cfpStatusOf(e: Edition): CfpStatus | null {
  if (!e.cfp) return null;
  if (today < e.cfp.opens) return 'soon';
  if (phaseOf(e) !== 'upcoming' || (e.cfp.closes && today > e.cfp.closes)) return 'closed';
  return 'open';
}

export const getEdition = (year: number) => editions.find((e) => e.year === year);

export const talksOf = (e: Edition) => e.sessions.filter((s): s is Talk => s.kind === 'talk');

export const speakersOf = (e: Edition) => [...new Set(talksOf(e).flatMap((t) => t.speakers))];

/** "09:10" -> "9h10" */
export const formatTime = (t: string) => {
  const [h, m] = t.split(':');
  return `${Number(h)}h${m}`;
};

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Paris',
  })
    .format(new Date(`${iso}T12:00:00Z`))
    .replace(/^./, (c) => c.toUpperCase());

/** "2025-12-12" -> "12 décembre 2025" */
export const formatDay = (iso: string) =>
  new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Paris',
  }).format(new Date(`${iso}T12:00:00Z`));

export type Row = { start: string; plenary: Session | null; parallel: Talk[] };

/** Groups sessions by start time: one plenary session, or parallel talks in room order. */
export function rowsOf(e: Edition): Row[] {
  const rows = new Map<string, Row>();
  for (const s of e.sessions) {
    const row = rows.get(s.start) ?? { start: s.start, plenary: null, parallel: [] };
    if (s.kind === 'talk' && s.room !== undefined) row.parallel.push(s);
    else row.plenary = s;
    rows.set(s.start, row);
  }
  for (const r of rows.values()) r.parallel.sort((a, b) => a.room! - b.room!);
  return [...rows.values()];
}
