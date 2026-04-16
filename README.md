# Pocket Brains

Pocket Brains is a plain static site for browsing compact neuro-focused paper cards and full markdown detail views.

It borrows the visual feel and note-detail presentation style from `pocket-reads`, but narrows the shelf around neuro, brain, cognition-adjacent neurotech, mental health, and computational neuroscience notes.

This repo is intentionally simple:

- no daily digests
- no audio
- static GitHub Pages-style site
- content generated locally from markdown files
- currently supports **paper notes** only

## Repo structure

- `index.html` - static shell
- `styles.css` - site styling
- `app.js` - client-side rendering for overview, cards, detail view, and search
- `paper_notes/` - source markdown notes for neuro-focused papers
- `build_content.py` - parses markdown into `data/content.json`
- `data/content.json` - generated content snapshot committed with the site

## Content model

Pocket Brains is a neuro-focused reading shelf. Good fits include:
- computational neuroscience
- brain imaging / decoding / neurotech
- psychiatry / mental health papers with real neuro or clinical relevance
- autism / pediatric affect / digital phenotyping when the note is clearly neuro-adjacent
- concept or framework papers that are directly useful for neuro-flavored agent, cognition, or representation questions

## Add a paper note

Add a new markdown file under `paper_notes/` using the `i-read-something` deep-read structure.

## Rebuild content

Run:

```bash
python3 build_content.py
```

## Local preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Basic verification checklist

After adding or updating notes:
1. run `python3 build_content.py`
2. load the local site
3. confirm the entry appears in the library
4. confirm keyword search finds it using obvious neuro terms
5. confirm the detail page renders and the source link works

## GitHub Pages

This repo is ready for basic GitHub Pages hosting from the repository root:

1. Push `main`
2. In GitHub settings, enable Pages
3. Choose `Deploy from branch`
4. Use branch `main` and folder `/ (root)`
