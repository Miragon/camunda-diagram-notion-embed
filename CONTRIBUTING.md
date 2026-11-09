# Contributing

Thanks for your interest in improving **camunda-diagram-notion-embed**! This is a small static app, so getting from clone to a merged PR is quick.

## External contributions

We're currently not accepting pull requests from outside the team. We don't have the resources to fully review and validate external contributions, so we can't guarantee that a merged change keeps the project free of bugs, free of security vulnerabilities or malicious code, and consistent with requirements that make sense for it. Pull requests opened by external contributors will be closed.

If you've found a bug or have an idea, please [open an issue](https://github.com/Miragon/camunda-diagram-notion-embed/issues/new) instead. We read every one, and it's the best way to get something onto our radar.

## Project layout

- `index.html` — the page markup.
- `styles.css` — the page design.
- `main.js` — the entry point: shows the embed when the page has a `?u=` parameter, the form otherwise.
- `share-url.js` — `ShareUrl`: validates a Camunda share URL and turns it into the embed URL.
- `notion-embed-link.js` — `NotionEmbedLink`: builds the `?u=` link for Notion and reads it back.
- `https-url.js` — `HttpsUrl` and `InvalidUrlError`: accepts only `https://` URLs.
- `share-form.js` — `ShareForm`: input, **Generate**, **Copy** and error messages.
- `embed-view.js` — `EmbedView`: renders the embed in a full-screen iframe.
- `images/` — assets.

There is no build step, no framework, and no dependencies.

## How it works

- The page takes a Camunda Web Modeler **share** URL and rewrites its `share` path segment to `embed` to get Camunda's embeddable view.
- It wraps that as `…/?u=<encoded-embed-url>`, the URL users paste into Notion.
- Opened with `?u=`, the page renders the embed URL in a full-screen `<iframe>`, which is what Notion's embed block loads. Only `https://` URLs are rendered.

## Local setup

```bash
git clone https://github.com/Miragon/camunda-diagram-notion-embed.git
cd camunda-diagram-notion-embed
python3 -m http.server 8000   # then open http://localhost:8000
```

Any static file server works. Opening `index.html` straight from disk does not, because browsers block ES modules on `file://`.

## Testing your change

There is no automated test suite. Verify manually before opening a PR:

1. Open the local page.
2. Paste a real Camunda Web Modeler **share** URL and click **Generate**.
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

1. Create a branch (`feat/short-description` or `fix/short-description`).
2. Make your change and test it manually as above.
3. Open a pull request against `main`, filling in the PR template and linking any related issue.
4. A maintainer will review — feel free to ask questions in the PR or a related issue.

## Deployment

The site is hosted on Netlify. There is no build step — Netlify serves the repository root as
configured in `netlify.toml`. To self-host, serve the repository root from any static host. Once the repo is connected in Netlify, every push to `main` deploys
automatically, and each pull request gets its own preview URL.

## Code of Conduct

All participation is governed by our [Code of Conduct](CODE_OF_CONDUCT.md).
