# DH.arc seminars — website template

A production-ready, editorially-styled website for the **DH.arc seminars**, a recurring
academic seminar series hosted by the DH.arc group at the University of Bologna. The
first edition is **_From Knowledge to Practice_**.

The architecture is built for **annual reuse**: each new edition replaces the site root,
while past editions are frozen into `/archive/<edition-slug>/` subfolders — all inside a
single repository served from a single `gh-pages` branch.

- **Stack:** React 18 + JavaScript + Tailwind CSS v3 + Vite
- **No** React Router / client-side routing — one long anchor-scrolled page
- **No** TypeScript
- **Deployment:** GitHub Pages via a manually-triggered GitHub Actions workflow

> The local folder is named `dharc-seminars-site`. The intended **repository** name is
> `dharc-seminars` (the archive URLs in `src/config/editions.js` assume it). Rename the
> folder if you like — only the GitHub repo name matters for the published URLs.

---

## The one constraint you must never break: relative asset paths

`vite.config.js` sets **`base: './'`**. This makes Vite emit **relative** asset paths
(`./assets/index.js`, not `/assets/index.js`). It is the single most important setting in
the project: without it, a build placed inside `/archive/from-knowledge-to-practice/` would
request its assets from the domain root and break completely.

The same rule applies to data fetches: the program is loaded with
`fetch('./data/program.json')` — **never** `'/data/program.json'`. Keep every asset
reference relative.

---

## 1. Run the project locally

Requires **Node 20+**.

```bash
cd dharc-seminars-site
npm install      # first time only
npm run dev      # start the dev server (Vite prints a localhost URL)
```

Other scripts:

```bash
npm run build    # production build into dist/
npm run preview  # serve the built dist/ locally to sanity-check it
```

### Where things live

| What | Where |
| --- | --- |
| Current edition metadata | `src/config/edition.js` |
| Past editions (nav dropdown) | `src/config/editions.js` |
| **Program schedule (only runtime data)** | `public/data/program.json` |
| Hero image | `public/hero.jpg` |
| **Theme — colors & fonts (retheme here)** | `src/styles/theme.css` |
| All other copy (hero, about, committee, footer) | hardcoded in `src/components/*.jsx` |

**Rethemeing:** change the CSS variables in `src/styles/theme.css` and nothing else.
Components reference those variables through Tailwind tokens (`text-accent`,
`font-heading`, …) or `var(--…)` — no component hardcodes a hex value or font name.

---

## 2. First deployment

The site deploys to the `gh-pages` branch and is served by GitHub Pages.

1. **Create the GitHub repo** (recommended name: `dharc-seminars`) and push this project
   to its **`main`** branch.
2. **Allow Actions to write to the repo:**
   `Settings → Actions → General → Workflow permissions → Read and write permissions` →
   Save. (The workflow already requests `contents: write`; this setting must also allow it.)
3. **Run the deploy workflow manually:**
   `Actions` tab → **Deploy edition** → **Run workflow** → run on `main`.
   This builds the site and pushes it to the `gh-pages` branch (creating that branch on the
   first run).
4. **Enable GitHub Pages:**
   `Settings → Pages → Build and deployment → Source: Deploy from a branch` →
   Branch: **`gh-pages`**, folder: **`/ (root)`** → Save.
5. After a minute the site is live at
   `https://<org-or-user>.github.io/dharc-seminars/`.

> The workflow triggers on **`workflow_dispatch` only** — it never deploys automatically on
> push. You consciously decide when to publish.

### How the workflow archives editions (what happens on each run)

1. Checks out `main`, runs `npm ci` and `npm run build` → `dist/`.
2. Reads the current edition `slug` from `src/config/edition.js`.
3. Checks out the existing `gh-pages` branch (or starts a fresh one).
4. **Archive guard:** if `archive/<current-slug>/` already exists, it **fails** with a clear
   message — this edition was already published, so you must bump the slug first.
5. **Root detection:** if a previous edition is live at the root, it reads that edition's
   slug from `.edition-meta.json` and moves the entire root (except `archive/` and `.git`)
   into `archive/<previous-slug>/`.
6. Copies the new `dist/` into the root.
7. Writes a fresh `.edition-meta.json` (`{ slug, name, year }`) — this is the breadcrumb the
   *next* deploy uses to know how to archive the now-current edition.
8. Commits and pushes `gh-pages`.

You never edit the `gh-pages` branch by hand.

---

## 3. Launching a new edition — yearly checklist

Do all of this on `main`, commit, then deploy.

### a) `src/config/edition.js` — set the new edition (required)

```js
export const currentEdition = {
  name: "The New Edition Title",
  slug: "the-new-edition-title",   // ← MUST be new & unique (kebab-case). This is the archive key.
  year: 2026,
  seriesName: "DH.arc seminars",   // unchanged
};
```

⚠️ The `slug` **must change** every edition. If you forget, the deploy workflow’s archive
guard stops you with an error rather than overwriting anything.

### b) `public/data/program.json` — replace the schedule (required)

Replace the contents with the new edition’s schedule. Schema:

```
days[]              → date (e.g. "05.11.26") + sessions[]
  sessions[]        → label ("morning session") + theme ("…<LEARNING>") + slots[]
    slots[]         → time, type, title, (speaker)
```

- `type` is one of:
  - `"talk"` — `speaker` (regular) + `title` (italic)
  - `"keynote"` — same fields, shown with an accent left-border + “Keynote” marker
  - `"break"` — `title` only, muted (no `speaker`)
- Give every `day`, `session`, and `slot` a unique `id`.

Also update the hero/about/committee/footer copy in `src/components/*.jsx` and swap
`public/hero.jpg` if the new edition has its own artwork. Retheme via
`src/styles/theme.css` if you want a new color/typography identity.

### c) `src/config/editions.js` — add the edition you’re *replacing* (timing matters)

This file powers the **Previous Editions** dropdown. Add **one entry for the edition that is
currently live** — i.e. the one this deploy is about to archive.

**When:** do this in the *same commit* as the new edition, **before** you deploy. The entry
points at the URL the about-to-be-archived edition will have once this deploy archives it:

```js
export const pastEditions = [
  {
    name: "From Knowledge to Practice",
    slug: "from-knowledge-to-practice",
    year: 2025,
    url: "https://<org-or-user>.github.io/dharc-seminars/archive/from-knowledge-to-practice/",
  },
  // older editions stay here too, newest-first
];
```

If `pastEditions` is empty, the dropdown is hidden entirely (as it is for the very first
edition).

> **Special case — the 2025 edition lives in another repo.** The 2025 edition
> (*Building Knowledge Landscapes Across the Digital Humanities*) was published from a separate
> repository and is already live at its own GitHub Pages URL, so its `editions.js` entry links
> **directly to that external URL** rather than to an `/archive/` folder in this repo. This is a
> one-off hardcoded link and it does not affect the archival flow: every future edition is still
> archived into this repo's `/archive/<slug>/` and added here with its in-repo URL, newest-first,
> alongside the hardcoded 2025 entry.

### d) Deploy

`Actions → Deploy edition → Run workflow` on `main`. The workflow archives the previous
edition automatically and publishes the new one at the root.

### Quick recap

| Step | File | Action |
| --- | --- | --- |
| 1 | `src/config/edition.js` | New `name`, **new unique `slug`**, new `year` |
| 2 | `public/data/program.json` | New schedule |
| 3 | `src/components/*.jsx`, `public/hero.webp`, `src/styles/theme.css` | New copy / image / theme (optional) |
| 4 | `src/config/editions.js` | Add the edition being replaced (before deploy) |
| 5 | — | Run **Deploy edition** workflow manually |

---

## Project structure

```
dharc-seminars-site/
├── public/
│   ├── data/program.json        # the only runtime data file
│   └── hero.webp                # hero background image
├── src/
│   ├── config/
│   │   ├── edition.js           # current edition metadata
│   │   └── editions.js          # past editions for the nav dropdown
│   ├── components/
│   │   ├── Nav.jsx  Hero.jsx  About.jsx  Program.jsx  Committee.jsx  Footer.jsx
│   ├── styles/theme.css         # CSS custom properties — the single place to retheme
│   ├── App.jsx  main.jsx  index.css
├── .github/workflows/deploy.yml # manual deploy + archival
├── vite.config.js               # base: './'  (non-negotiable)
├── tailwind.config.js
├── postcss.config.js
└── package.json
```
