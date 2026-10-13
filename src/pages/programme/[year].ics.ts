import type { APIRoute, GetStaticPaths } from 'astro';
import { type Edition, currentEdition, talksOf } from '../../data/editions';
import { venue } from '../../data/site';

// Only the current edition: a calendar for a past event is of no use
export const getStaticPaths = (() => [
  { params: { year: String(currentEdition.year) }, props: { edition: currentEdition } },
]) satisfies GetStaticPaths;

/** Converts a Paris wall-clock time to an iCalendar UTC timestamp (20260606T071000Z). */
function toUtc(date: string, time: string) {
  const guess = new Date(`${date}T${time}:00Z`);
  const offset = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Paris',
    timeZoneName: 'longOffset',
  })
    .formatToParts(guess)
    .find((p) => p.type === 'timeZoneName')!
    .value.match(/([+-])(\d{2}):(\d{2})/);
  const minutes = offset
    ? (offset[1] === '-' ? -1 : 1) * (Number(offset[2]) * 60 + Number(offset[3]))
    : 0;
  return new Date(guess.getTime() - minutes * 60_000)
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
}

const escape = (s: string) =>
  s
    .replace(/\\/g, '\\\\')
    .replace(/[;,]/g, (c) => `\\${c}`)
    .replace(/\n/g, '\\n');

/** RFC 5545 line folding at 75 octets. */
function fold(line: string) {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;
  const out: string[] = [];
  let current = '';
  for (const ch of line) {
    if (new TextEncoder().encode(current + ch).length > (out.length ? 74 : 75)) {
      out.push(current);
      current = '';
    }
    current += ch;
  }
  out.push(current);
  return out.join('\r\n ');
}

function calendar(edition: Edition) {
  const stamp = toUtc(edition.date, '00:00');
  const location = escape([venue.name, ...venue.lines].join(', '));
  const events = talksOf(edition).map((t, i) => {
    const room = t.room === undefined ? 'Toutes les salles' : edition.rooms[t.room];
    const description = [
      t.speakers.join(', '),
      edition.roomsNamed || t.room === undefined ? room : '',
    ]
      .filter(Boolean)
      .join('\n');
    return [
      'BEGIN:VEVENT',
      `UID:polycloud-${edition.year}-${t.start.replace(':', '')}-${t.room ?? 'all'}-${i}@polycloud.fr`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${toUtc(edition.date, t.start)}`,
      `DTEND:${toUtc(edition.date, t.end)}`,
      `SUMMARY:${escape(t.title)}`,
      description && `DESCRIPTION:${escape(description)}`,
      t.video && `URL:${t.video}`,
      `LOCATION:${location}`,
      'END:VEVENT',
    ].filter(Boolean);
  });

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Polycloud//Programme//FR',
    'CALSCALE:GREGORIAN',
    `X-WR-CALNAME:Polycloud ${edition.year}`,
    ...events.flat(),
    'END:VCALENDAR',
  ]
    .map((l) => fold(l as string))
    .join('\r\n');
}

export const GET: APIRoute = ({ props }) =>
  new Response(calendar(props.edition as Edition), {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
