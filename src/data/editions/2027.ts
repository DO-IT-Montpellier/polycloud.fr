import type { Edition } from './types';

const edition: Edition = {
  year: 2027,
  date: '2027-05-22',
  ordinal: 'Sixième édition',
  rooms: ['Amphi Peytavin', 'Salle SC001', 'Salle SC002'],
  roomsNamed: true,
  notes: ['Les conférences sont intégralement en français.'],
  talkHours: 8,
  cfp: {
    opens: '2026-11-16',
    url: 'https://conference-hall.io/polycloud-2027',
  },
  sessions: [],
  team: [
    {
      name: 'Dorian Richard',
      role: 'Speakers',
      linkedin: 'https://www.linkedin.com/in/richard-dorian/',
      icon: 'drichard',
    },
    {
      name: 'Nadia Lahya',
      role: 'Communication',
      linkedin: 'https://www.linkedin.com/in/nadia-lahya-0b357a330/',
      icon: 'nlahya',
    },
    {
      name: 'Ghadi Saab',
      role: 'Sponsors',
      linkedin: 'https://www.linkedin.com/in/ghadi-saab-2308962b0/',
      icon: 'gsaab',
    },
    {
      name: 'Dimitri Martel',
      role: 'Speakers',
      linkedin: 'https://www.linkedin.com/in/dimitrimartel/',
      icon: 'dmartel',
    },
    {
      name: 'Louis Michault',
      role: 'Logistique',
      linkedin: 'https://www.linkedin.com/in/louis-michault/',
      icon: 'lmichault',
    },
    {
      name: 'Charlotte Lewis',
      role: 'Communication',
      linkedin: 'https://www.linkedin.com/in/charlotte-lewis-425262264/',
      icon: 'clewis',
    },
    {
      name: 'Kilian Nagel',
      role: 'Logistique',
      linkedin: 'https://www.linkedin.com/in/kilian-nagel/',
      icon: 'knagel',
    },
    {
      name: 'Léo Torres',
      role: 'Sponsors',
      linkedin: 'https://www.linkedin.com/in/leo-torres-804687264/',
      icon: 'ltorres',
    },
    {
      name: 'Eliott Bassier',
      role: 'Logistique',
      linkedin: 'https://www.linkedin.com/in/eliottbassier/',
      icon: 'ebassier',
    },
  ],
};

export default edition;
