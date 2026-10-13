import type { Edition, Session, Talk } from './types';
import e2022 from './2022';
import e2023 from './2023';
import e2024 from './2024';
import e2025 from './2025';
import e2026 from './2026';

export * from './types';

/** Newest first. */
export const editions: Edition[] = [e2026, e2025, e2024, e2023, e2022];
export const currentEdition = editions[0];

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
