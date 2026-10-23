# Adaptive DSA Practice

A standalone, responsive JavaScript app for structured coding-interview practice. It selects problems from a curated **NeetCode-style** set across **12 algorithm patterns**, links to LeetCode for solving, and uses your self-reported outcomes to prioritize weaker areas.

## Features
- **Weighted practice scheduler:** struggling increases a pattern's selection weight; clean solves reduce it.
- **Adaptive difficulty:** two consecutive clean solves advance eligible patterns from medium to hard.
- **Repeat avoidance:** samples unseen problems within a pattern/difficulty pool before cycling.
- **Learning notes:** displays a problem-specific insight after you log an attempt.
- **Local progress:** stores attempts and current session using browser `localStorage`.
- **Portable backups:** export/import your progress as JSON.
- **Responsive UI:** works on mobile and desktop; no framework or account required.

> This is a practice scheduler, **not a code execution platform**. Solve on LeetCode and rate your outcome in the app. The curated list and learning notes are original app content; problem titles link to LeetCode. This project is not affiliated with NeetCode or LeetCode.

## Run locally

ES modules require serving files over HTTP instead of opening `index.html` via `file://`.

```bash
python -m http.server 8000
```

Open http://localhost:8000 in your browser.

## Tests

Node.js 20+:

```bash
node --test tests/*.test.js
```

## Deploy on GitHub Pages

1. Create a public repository named `adaptive-dsa-practice` and push these files to the `main` branch.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then `main` and `/ (root)`.
4. Save. GitHub will provide the live URL after publishing.

## How scheduling works

Every pattern starts with weight 1. A clean solve reduces weight by 0.5 (minimum 0.5), a slow/hinted solve adds 0.5, and an unsolved problem adds 1 (maximum 5). Patterns are selected with probability proportional to weight, excluding the immediately previous pattern. Two consecutive clean solves increase difficulty where hard problems exist. Problem IDs are tracked by slug to avoid repeats within each tier until exhausted.

## Tech stack

HTML5, CSS3, JavaScript ES modules, localStorage, Node.js built-in test runner.

## Future ideas

Spaced repetition by problem, more difficulty tiers, streak charts, optional cloud sync, and additional question sets.
