/**
 * The sponsoring offer shown on /partenaires. This is the only place prices live:
 * the form sends each choice with the label built here, and the API stores it as is.
 */

/** A choice sent to the API: a stable id plus the label shown to the visitor. */
export type Choice = { id: string; label: string };

export interface TierOffer {
  id: 'platine' | 'or' | 'argent' | 'communaute';
  name: string;
  priceEur: number;
  slots: string;
  pitch: string;
  recommended?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  priceEur: number;
  description: string;
}

export const tiers: TierOffer[] = [
  {
    id: 'platine',
    name: 'Platine',
    priceEur: 4000,
    slots: '1 seule place',
    pitch: "Votre nom associé à l'édition.",
  },
  {
    id: 'or',
    name: 'Or',
    priceEur: 2000,
    slots: '4 places',
    pitch: 'Rencontrer et recruter les profils DevOps.',
    recommended: true,
  },
  {
    id: 'argent',
    name: 'Argent',
    priceEur: 1000,
    slots: '8 places',
    pitch: 'Être présent et visible le jour J.',
  },
  {
    id: 'communaute',
    name: 'Communauté',
    priceEur: 300,
    slots: 'Places illimitées',
    pitch: "Soutenir l'événement.",
  },
];

export const undecidedTier: Choice = { id: 'indecis', label: 'Je ne sais pas encore' };

export const addOns: AddOn[] = [
  {
    id: 'pause',
    name: 'Pause café / déjeuner',
    priceEur: 800,
    description: 'Votre marque sur le moment le plus fréquenté',
  },
  {
    id: 'replays',
    name: 'Replays YouTube',
    priceEur: 1000,
    description: '« Replays offerts par … » en intro de chaque vidéo',
  },
  {
    id: 'atelier',
    name: 'Atelier sponsorisé',
    priceEur: 1200,
    description: "Hands-on de 1 h 30, contenu validé par l'équipe",
  },
  {
    id: 'lanyards',
    name: 'Tours de cou (lanyards)',
    priceEur: 600,
    description: 'Fournis par vous, portés toute la journée',
  },
  {
    id: 'afterparty',
    name: 'Afterparty',
    priceEur: 1000,
    description: 'Soirée speakers + participant·e·s',
  },
  {
    id: 'bourse',
    name: 'Bourse étudiante',
    priceEur: 150,
    description: "Déplacement d'un·e étudiant·e d'une autre école",
  },
];

export const companySizes: Choice[] = [
  { id: 'lt50', label: 'Moins de 50 salarié·e·s (–30 % sur Argent et Or)' },
  { id: '50-249', label: '50 à 249 salarié·e·s' },
  { id: '250plus', label: '250 salarié·e·s et plus' },
];

const eur = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });

/** "2 000 €" */
export const formatEur = (amount: number) => `${eur.format(amount)} €`;

/** "Or · 2 000 € HT · 4 places" */
export const tierChoice = (t: TierOffer): Choice => ({
  id: t.id,
  label: `${t.name} · ${formatEur(t.priceEur)} HT · ${t.slots}`,
});

/** "Afterparty · 1 000 €" */
export const addOnChoice = (a: AddOn): Choice => ({
  id: a.id,
  label: `${a.name} · ${formatEur(a.priceEur)}`,
});
