import type { Edition } from './types';

const edition: Edition = {
  year: 2022,
  date: '2022-05-21',
  ordinal: 'Première édition',
  rooms: ['Piste 1', 'Piste 2'],
  roomsNamed: false,
  sessions: [
    {
      kind: 'talk',
      start: '09:00',
      end: '09:25',
      keynote: true,
      title: "Keynote d'ouverture",
      speakers: [],
    },

    {
      kind: 'talk',
      start: '09:30',
      end: '10:00',
      room: 0,
      title: 'Containers Demystified',
      speakers: ['Samuel Ortiz'],
    },
    {
      kind: 'talk',
      start: '09:30',
      end: '10:00',
      room: 1,
      title: 'Load balancing dans un cloud privé',
      speakers: ['Thomas Perelle'],
    },

    {
      kind: 'talk',
      start: '10:05',
      end: '10:55',
      room: 0,
      title: "Le boot process : Une histoire de l'informatique moderne",
      speakers: ['Samuel Ortiz'],
    },
    {
      kind: 'talk',
      start: '10:05',
      end: '10:55',
      room: 1,
      title: 'Automate Openstack with Ansible',
      speakers: ['Cyril Lopez'],
    },

    { kind: 'break', start: '10:55', end: '11:05', title: 'Pause' },

    {
      kind: 'talk',
      start: '11:05',
      end: '11:55',
      room: 0,
      title: 'Microservices with Quarkus',
      speakers: ['Clément Escoffier'],
    },
    {
      kind: 'talk',
      start: '11:05',
      end: '11:55',
      room: 1,
      title: 'Learn how to start FinOps with Google Cloud',
      speakers: ['Seifeddin Mansri'],
    },

    // Not timed on the printed programme.
    { kind: 'break', start: '11:55', end: '14:00', title: 'Pause déjeuner (inclus)' },

    {
      kind: 'talk',
      start: '14:00',
      end: '14:50',
      room: 0,
      title: 'La CI/CD avec R2Devops',
      speakers: ['Alexandre Burgoni', 'Théo Ponthieu'],
    },
    {
      kind: 'talk',
      start: '14:00',
      end: '14:50',
      room: 1,
      title: 'Trust but verified',
      speakers: ['Nicolas Muller', 'Nicolas Tournier'],
    },

    {
      kind: 'talk',
      start: '14:55',
      end: '15:45',
      room: 0,
      title: 'Introduction to serverless',
      speakers: ['Seifeddin Mansri'],
    },
    {
      kind: 'talk',
      start: '14:55',
      end: '15:45',
      room: 1,
      title: 'Confidential computing',
      speakers: ['Samuel Ortiz'],
    },

    { kind: 'break', start: '15:45', end: '16:00', title: 'Pause goûter' },

    {
      kind: 'talk',
      start: '16:00',
      end: '16:50',
      room: 0,
      title: 'Le cloud au service de la cybersécurité',
      speakers: ['Nicolas Blasco'],
    },
    {
      kind: 'talk',
      start: '16:00',
      end: '16:50',
      room: 1,
      title: 'Des microservices aux migroservices',
      speakers: ['François Teychène'],
    },

    {
      kind: 'talk',
      start: '16:55',
      end: '17:45',
      room: 0,
      title: 'Mesure et impacts des infrastructures',
      speakers: ['Benoit Petit'],
    },
    {
      kind: 'talk',
      start: '16:55',
      end: '17:45',
      room: 1,
      title: 'Rex Orchestrateur de conteneurs en Rust',
      speakers: ['Hugo Amalric', 'Thomas Gouveia'],
    },

    { kind: 'talk', start: '17:45', end: '18:15', title: 'Short talks', speakers: [] },
  ],
};

export default edition;
