export const event = {
  edition: 5,
  editionLabel: 'cinquième',
  year: 2026,
  date: 'Samedi 6 juin 2026',
  hours: '8h30 à 19h',
  venue: 'Polytech Montpellier',
  ended: true,
};

export const links = {
  tickets: 'https://www.billetweb.fr/polycloud-2026',
  youtube: 'https://www.youtube.com/@Polycloud_mtp',
  replays2025: 'https://urls.fr/rgQtwp',
  maps: 'https://maps.app.goo.gl/ycGQfaiXGvp1fsr86',
  pressKit: '/files/polycloud_press_kit.zip',
  devopsCourse: 'https://www.polytech.umontpellier.fr/formation/cycle-ingenieur/devops',
};

/** `secondary` links are set apart, to the left of the main ones, in the desktop header. */
export const nav: { label: string; href: string; secondary?: boolean }[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Sponsors', href: '/#sponsors', secondary: true },
  { label: 'Accès', href: '/#informations', secondary: true },
  { label: 'Programme', href: '/programme' },
  { label: 'Speakers', href: '/speaker' },
  { label: "L'équipe", href: '/team' },
  { label: 'Éditions antérieures', href: '/previous-editions' },
];

export type SocialNetwork = 'linkedin' | 'x' | 'instagram' | 'youtube';

export const socials: { network: SocialNetwork; label: string; handle: string; href: string }[] = [
  {
    network: 'linkedin',
    label: 'LinkedIn',
    handle: 'polycloudmtp',
    href: 'https://www.linkedin.com/company/polycloudmtp',
  },
  {
    network: 'x',
    label: 'X (Twitter)',
    handle: '@PolycloudMtp',
    href: 'https://x.com/PolycloudMtp',
  },
  {
    network: 'instagram',
    label: 'Instagram',
    handle: '@polycloud_mtp',
    href: 'https://www.instagram.com/polycloud_mtp/',
  },
  {
    network: 'youtube',
    label: 'YouTube',
    handle: '@PolyCloud_mtp',
    href: 'https://www.youtube.com/@Polycloud_mtp',
  },
];

export const topics = [
  'Kubernetes',
  'CI/CD',
  'AWS',
  'Google Cloud',
  'Docker',
  'Rust',
  'Architectures Cloud',
];

export const venue = {
  name: 'Polytech Montpellier',
  lines: [
    'Université de Montpellier - Campus Triolet',
    'Place Eugène Bataillon - CC 419',
    'Bâtiment 31',
    '34095 Montpellier CEDEX - France',
  ],
  transport: [
    { mode: 'En avion', icon: 'plane', details: ['Aéroport Montpellier Méditerranée'] },
    { mode: 'En train', icon: 'train', details: ['Gare Montpellier Saint-Roch'] },
    {
      mode: 'En voiture',
      icon: 'car',
      details: ['Quartier Nord de Montpellier, « Hôpitaux – Facultés »'],
    },
    {
      mode: 'En tramway',
      icon: 'tram',
      details: [
        'Ligne 1, arrêt « Université Montpellier »',
        'Ligne 5, arrêt « Université Paul-Valéry »',
      ],
    },
  ],
} as const;
