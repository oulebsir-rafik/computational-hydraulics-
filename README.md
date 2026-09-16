# Computational Hydraulics

Course site built with [Docusaurus](https://docusaurus.io/), deployed to GitHub Pages at
https://oulebsir-rafik.github.io/computational-hydraulics-/.

Raw source material (lecture slide decks) lives in `courses/` and is not published — it's converted
chapter by chapter into the `docs/` folder.

## Development

```bash
npm install
npm start
```

## Build

```bash
npm run build
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it via
GitHub Pages (Settings → Pages → Source: **GitHub Actions**).
