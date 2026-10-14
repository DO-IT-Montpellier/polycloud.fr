![Polycloud — You don't know the cloud](public/press/header.png)

# polycloud.fr

Website of **Polycloud**, the free Cloud & DevOps conference organised every year by the DevOps students of Polytech Montpellier.

Live at **<https://do-it-montpellier.github.io/polycloud.fr/>**.

## Tech stack

- **[Astro](https://astro.build) 7**: static site, every page is pre-rendered at build time.
- **[Tailwind CSS](https://tailwindcss.com) 4**: styling. Brand colours and fonts are defined in `src/styles/global.css`.
- **[React](https://react.dev) 19**: only for the mobile menu (`MobileNav.tsx`). Everything else is plain Astro and HTML, with a few small scripts.
- **TypeScript**: the content (programmes, sponsors, team) is typed data, not a CMS.
- **[oxfmt](https://oxc.rs)**: formatter.
- **GitHub Pages**: hosting, deployed by GitHub Actions.

## Getting started

You need Node.js 22+ and [pnpm](https://pnpm.io).

```sh
pnpm install
pnpm dev        # http://localhost:4321/polycloud.fr/
```

| Command        | Action                                       |
| :------------- | :------------------------------------------- |
| `pnpm dev`     | Start the dev server                         |
| `pnpm build`   | Build the site to `./dist/`                  |
| `pnpm preview` | Serve the production build locally           |
| `pnpm format`  | Format the code with oxfmt                   |

> The site is served under `/polycloud.fr/`, so `http://localhost:4321/` alone shows a 404.
>
> If the dev server throws `Cannot read properties of null (reading 'useState')` after a config change, restart it with `pnpm dev --force` and hard-reload the page.

## Project structure

```
src/
├── data/
│   ├── editions/      One file per edition: programme, replays, sponsors, team, tickets, CFP
│   └── site.ts        Things that don't change between editions: links, nav, socials, venue
├── lib/
│   ├── url.ts         url() helper for the base path
│   └── cta.ts         Main call to action, depending on the event phase
├── components/        Layout pieces and UI components
├── pages/             One file per route
└── styles/global.css  Tailwind theme
public/                Images, press kit, downloadable files
```

## Working on the content

Almost everything you'll want to update lives in **`src/data/editions/`**.

### Editions

`editions` in `src/data/editions/index.ts` lists every edition, newest first. **The first one is the edition the whole site is about**: the home page, `/programme` and `/team` all use it. Every other edition automatically gets its own page under `/previous-editions/<year>`.

To announce a new edition, copy the latest year's file, then add it **at the top** of the list:

```ts
// src/data/editions/2027.ts
const edition: Edition = {
  year: 2027,
  date: '2027-06-05',
  ordinal: 'Sixième édition',
  rooms: ['Amphi Peytavin', 'Salle SC001'],
  roomsNamed: true,
  tickets: 'https://www.billetweb.fr/polycloud-2027', // optional
  cfp: { opens: '2026-12-01', closes: '2027-02-15', url: 'https://…' }, // optional
  sessions: [], // empty until the programme is published
  sponsors: [/* … */], // optional
  team: [/* … */], // optional
};
```

The fields:

- **`sessions`**: the programme. Each one is either a `break` or a `talk`. A talk with a `room` index runs in parallel; a talk without one is shown across all rooms. Talks can also have a `topic`, `advanced: true`, `keynote: true`, and a YouTube `video` link once the replay is online.
- **`sponsors`** and **`team`**: optional. Leave them out when you don't have the data, and the matching sections are hidden.

### Links and images

The site is served from a sub-path (`base: '/polycloud.fr'` in `astro.config.mjs`), and Astro does not prefix links for you. Wrap every internal link or asset path in `url()`:

```astro
---
import { url } from '../lib/url';
---
<a href={url('/programme')}>Programme</a>
<img src={url('/images/plan.jpg')} alt="…" />
```

The `Button` component calls `url()` itself, so you can pass it plain paths.

## Event phase and `POLYCLOUD_TODAY`

The wording of the site follows the date of the current edition:

| Phase      | When                  | Main call to action | Examples                                            |
| :--------- | :-------------------- | :------------------ | :-------------------------------------------------- |
| `upcoming` | before the event      | Billetterie         | "qui tiendra sa…", "Ajouter à mon agenda"           |
| `today`    | on the day            | Programme du jour   | "C'est aujourd'hui !"                               |
| `ended`    | after the event       | Rediffusions        | "s'est tenue le…", "la prochaine édition sera annoncée" |

The CFP block on the speaker page also says whether the CFP will open soon, is open, or is closed, based on `cfp.opens` and `cfp.closes`.

"Today" is evaluated **at build time** (Paris time), so the deploy workflow rebuilds the site every day at 3:00 UTC to keep it current.

To preview the site as it will look on another day, set `POLYCLOUD_TODAY` (format `YYYY-MM-DD`):

```sh
# The weeks before the event: tickets, "Rendez-vous le…", calendar download
POLYCLOUD_TODAY=2026-05-01 pnpm dev

# The day of the event: "C'est aujourd'hui !", "Programme du jour"
POLYCLOUD_TODAY=2026-06-06 pnpm dev

# After the event: replays, "la prochaine édition sera annoncée prochainement"
POLYCLOUD_TODAY=2026-06-07 pnpm dev

# Before the CFP opens (2025-12-12 for 2026): "Le CFP ouvrira le…"
POLYCLOUD_TODAY=2025-11-01 pnpm build && pnpm preview
```

When it isn't set, the real date is used.

## Deployment

Every push to `main` builds the site and deploys it to GitHub Pages (`.github/workflows/github-pages.yml`). The same workflow also runs daily, and can be started by hand from the Actions tab.

In the repository settings, **Pages → Source** must be set to **GitHub Actions**.
