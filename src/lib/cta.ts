import { currentEdition, phase } from '../data/editions';
import { links } from '../data/site';

export type Cta = { label: string; shortLabel: string; href: string; external: boolean };

/** The main action of the moment, shared by the header, the mobile menu and the home hero. Internal hrefs are not prefixed with the base path. */
export function mainCta(): Cta | null {
  if (phase === 'upcoming') {
    return currentEdition.tickets
      ? {
          label: 'Réserver ma place',
          shortLabel: 'Billetterie',
          href: currentEdition.tickets,
          external: true,
        }
      : null;
  }
  if (phase === 'today') {
    return {
      label: 'Programme du jour',
      shortLabel: 'Programme',
      href: '/programme',
      external: false,
    };
  }
  return {
    label: 'Voir les rediffusions',
    shortLabel: 'Rediffusions',
    href: links.youtube,
    external: true,
  };
}
