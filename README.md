Headless WordPress Starter Kit

Modern Next.js (App Router) starter that demonstrates fetching WordPress content via:
- REST (`/wp-json/wp/v2/...`)
- GraphQL (`/graphql`, via the WPGraphQL plugin)

This repo assumes WordPress runs separately (recommended: WordPress Studio).

## Quickstart (WordPress Studio)
1) Create a new site in Studio using the **Developer** template.
2) Install and activate **WPGraphQL** (Plugins → Add New → search “WPGraphQL”).
   - Plugin page: https://wordpress.org/plugins/wp-graphql/

## Quickstart (frontend)
Requirements:
- Node.js 20 LTS (see `.nvmrc`)

1) Configure env:
- Copy `frontend/.env.example` to `frontend/.env.local`
- Set URLs (defaults assume Studio at `http://localhost:8881`)

2) Install and run:
- `npm --prefix frontend install`
- `npm --prefix frontend run dev`

3) Open `http://localhost:3000`

## Routes
- `/` — homepage showing your WordPress site title + latest posts preview (REST).
- `/rest-posts` — list posts via REST, links to REST post detail.
- `/posts/[slug]` — REST post detail.
- `/graphql-posts` — list posts via GraphQL, links to GraphQL post detail.
- `/graphql-posts/[slug]` — GraphQL post detail.

## License
MIT — see `LICENSE`.

## Releases
See `CHANGELOG.md` for release notes.

## Attribution
Inspired by Postlight’s `headless-wp-starter` project (a Docker-based WordPress + React starter kit). This repo is a modern reimplementation focused on WordPress Studio + Next.js.
