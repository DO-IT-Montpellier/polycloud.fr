import type { Edition } from './types';

const edition: Edition = {
  year: 2024,
  date: '2024-06-01',
  ordinal: 'Troisième édition',
  rooms: ['Piste 1', 'Piste 2'],
  roomsNamed: false,
  sessions: [
    { kind: 'break', start: '09:00', end: '09:20', title: 'Ouverture' },
    {
      kind: 'talk',
      start: '09:20',
      end: '10:00',
      keynote: true,
      title: "L'image Docker qui valait 500k€",
      speakers: ['François Teychène'],
      video: 'https://www.youtube.com/watch?v=qHKeYDQy1P0',
    },

    {
      kind: 'talk',
      start: '10:10',
      end: '11:00',
      room: 0,
      title: 'Getting started with AIOps',
      speakers: ['Seifeddin Mansri'],
      video: 'https://www.youtube.com/watch?v=hbXKC9ispWY',
    },
    {
      kind: 'talk',
      start: '10:10',
      end: '11:00',
      room: 1,
      title:
        'The Soul of a Machine: Designing, Implementing and Manufacturing a Microprocessor for the Cloud',
      speakers: ['Samuel Ortiz'],
      video: 'https://www.youtube.com/watch?v=knZauiAeZp4',
    },

    {
      kind: 'talk',
      start: '11:10',
      end: '12:00',
      room: 0,
      title: "Tester c'est douter… Alors doutons ensemble",
      speakers: ['Alexis Langlet'],
      video: 'https://www.youtube.com/watch?v=6twDL1o7uTI',
    },
    {
      kind: 'talk',
      start: '11:10',
      end: '12:00',
      room: 1,
      title:
        "Erlang/Elixir: Ce soir, déploies ton application comme si c'était l'année 1999(,999%)",
      speakers: ['Maxime Janvier'],
      video: 'https://www.youtube.com/watch?v=6u1yUmKhR20',
    },

    { kind: 'break', start: '12:00', end: '14:00', title: 'Pause déjeuner (inclus)' },

    {
      kind: 'talk',
      start: '14:00',
      end: '14:50',
      room: 0,
      title: 'Getting started with OpenTelemetry, incorporate observability from day 1',
      speakers: ['Alain Pham'],
      video: 'https://www.youtube.com/watch?v=NLrZO23_gVI',
    },
    {
      kind: 'talk',
      start: '14:00',
      end: '14:50',
      room: 1,
      title: 'Une image vaut mille mots ? Zoom sur l\'approche "Diagram as Code"',
      speakers: ['Xavier Quesnot'],
      video: 'https://www.youtube.com/watch?v=yv2fqevF9DA',
    },

    {
      kind: 'talk',
      start: '15:00',
      end: '15:30',
      room: 0,
      title: "Transformer votre application pour qu'elle soit plus verte avec du serverless",
      speakers: ['Guillaume Blaquiere'],
      video: 'https://www.youtube.com/watch?v=CUF21CXMOSs',
    },
    {
      kind: 'talk',
      start: '15:00',
      end: '15:30',
      room: 1,
      title: 'Going declarative with helmfile!',
      speakers: ['Antonin Brugnot'],
      video: 'https://www.youtube.com/watch?v=qacmfsnScHE',
    },

    {
      kind: 'talk',
      start: '15:40',
      end: '16:30',
      room: 0,
      title: 'Cracking the Quantum Code: Découvrons la révolution quantique !',
      speakers: ['Laurent Grangeau'],
      video: 'https://www.youtube.com/watch?v=dAnGCEvOGBI',
    },
    {
      kind: 'talk',
      start: '15:40',
      end: '16:30',
      room: 1,
      title: 'Trouver les bottlenecks réseaux dans Kubernetes',
      speakers: ['Clément Duveau'],
      video: 'https://www.youtube.com/watch?v=rQwmu1rSr7o',
    },

    {
      kind: 'talk',
      start: '16:40',
      end: '17:10',
      room: 0,
      title: 'Je hacke ta pipeline en 30 minutes',
      speakers: ['Carmen Piciorus'],
      video: 'https://www.youtube.com/watch?v=xcof3eItSUs',
    },
    {
      kind: 'talk',
      start: '16:40',
      end: '17:10',
      room: 1,
      title: 'REX : GAFAM vs SecNumCloud',
      speakers: ['Christopher Maurel'],
      video: 'https://www.youtube.com/watch?v=Ly9QN7-ScdY',
    },

    { kind: 'break', start: '17:10', end: '19:00', title: 'Scène ouverte / apéro' },
  ],
};

export default edition;
