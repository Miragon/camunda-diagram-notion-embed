# Contributing

Thanks for your interest in improving **camunda-diagram-notion-embed**! This is a small, single-file
static app, so getting from clone to a merged PR is quick.

## Project layout

- `index.html` — the entire app (HTML, CSS, and vanilla JavaScript in one file).
- `images/` — assets.

There is no build step, no framework, and no dependencies.

## Local setup

```bash
git clone https://github.com/Miragon/camunda-diagram-notion-embed.git
cd camunda-diagram-notion-embed
python3 -m http.server 8000   # then open http://localhost:8000
```

Any static file server works — you can also just open `index.html` in a browser.

## Testing your change

There is no automated test suite. Verify manually before opening a PR:

1. Open the local page.
2. Paste a real camunda.io or Cawemo **share** URL and click **Go**.
3. Copy the generated URL and confirm it loads the diagram in a full-screen iframe.
4. Paste it into a Notion `/embed` block and confirm the diagram renders.

## Commit convention

Please use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add support for <x>
fix: correct share-to-embed URL rewrite
docs: clarify how-to-use steps
```

## Pull request process

1. Fork the repo and create a branch (`feat/short-description` or `fix/short-description`).
2. Make your change and test it manually as above.
3. Open a pull request against `main`, filling in the PR template and linking any related issue.
4. A maintainer will review — feel free to ask questions in the PR or a related issue.

## Deployment

The site is hosted on Netlify. There is no build step — Netlify serves the repository root as
configured in `netlify.toml`. Once the repo is connected in Netlify, every push to `main` deploys
automatically, and each pull request gets its own preview URL.

## Code of Conduct

All participation is governed by our [Code of Conduct](CODE_OF_CONDUCT.md).
