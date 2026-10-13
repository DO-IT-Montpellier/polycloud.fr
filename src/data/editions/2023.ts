import type { Edition } from './types';

const edition: Edition = {
  year: 2023,
  date: '2023-05-27',
  ordinal: 'Deuxième édition',
  rooms: ['Piste 1', 'Piste 2'],
  roomsNamed: false,
  sessions: [
    {
      kind: 'talk',
      start: '09:00',
      end: '09:25',
      keynote: true,
      title: 'Harder, Better, Smaller',
      speakers: ['Cyril Cuvier'],
    },

    {
      kind: 'talk',
      start: '09:30',
      end: '10:25',
      room: 0,
      title: 'The Miserable Life of a CPU Instruction (talk en français)',
      speakers: ['Samuel Ortiz'],
    },
    {
      kind: 'talk',
      start: '09:30',
      end: '10:25',
      room: 1,
      title: "La puissance et la flexibilité des services Cloud d'AWS",
      speakers: ['Théo Ponthieu', 'Achraf El Mahmoudi'],
    },

    // The printed programme says 10h25–11h50, an obvious typo: the next talks start at 10h50.
    { kind: 'break', start: '10:25', end: '10:50', title: 'Pause' },

    {
      kind: 'talk',
      start: '10:50',
      end: '11:45',
      room: 0,
      title: "Comment tu as config ça déjà ? L'IaC à la rescousse !",
      speakers: ['Maxime Foucher'],
    },
    {
      kind: 'talk',
      start: '10:50',
      end: '11:45',
      room: 1,
      title: "Mise en place d'une architecture IoT avec AWS et des cartes STM32",
      speakers: ['Nicolas Bruot'],
    },

    {
      kind: 'talk',
      start: '11:50',
      end: '12:45',
      room: 0,
      title: 'Retour vers le futur avec Quarkus, la stack Java Cloud Native',
      speakers: ['Sebastien Blanc'],
    },
    {
      kind: 'talk',
      start: '11:50',
      end: '12:15',
      room: 1,
      title: 'Introduction à Kafka',
      speakers: ['Roch Dardié'],
    },

    // Not timed on the printed programme.
    { kind: 'break', start: '12:45', end: '14:00', title: 'Pause déjeuner (inclus)' },

    {
      kind: 'talk',
      start: '14:00',
      end: '14:55',
      room: 0,
      title: 'Pourquoi et comment faire du kube dans un cloud privé',
      speakers: ['Cyril Lopez'],
    },
    {
      kind: 'talk',
      start: '14:00',
      end: '14:55',
      room: 1,
      title: 'REX: Une infrastructure Serverless de zéro, en Rust',
      speakers: ['Alexandre Burgoni'],
    },

    {
      kind: 'talk',
      start: '15:00',
      end: '15:55',
      room: 0,
      title: 'Réduire son empreinte carbone grâce au cloud',
      speakers: ['Olivier Jacques', 'Wafae Bakkali'],
    },
    {
      kind: 'talk',
      start: '15:00',
      end: '15:55',
      room: 1,
      title: 'Why DevOps guys have to care about cybersecurity (talk en français)',
      speakers: ['Léo Héritier'],
    },

    { kind: 'break', start: '15:55', end: '16:15', title: 'Pause goûter' },

    {
      kind: 'talk',
      start: '16:15',
      end: '17:10',
      room: 0,
      title: 'Déployer son application avec la philosophie GitOps',
      speakers: ['Alexandre Gomez'],
    },
    {
      kind: 'talk',
      start: '16:15',
      end: '17:10',
      room: 1,
      title: 'Les bonnes pratiques OAuth2/OIDC conjuguées au présent, passé simple et futur',
      speakers: ['Mathieu Humbert'],
    },

    { kind: 'talk', start: '17:15', end: '18:00', title: 'Short talks', speakers: [] },
  ],
};

export default edition;
