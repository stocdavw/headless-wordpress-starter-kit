Headless WordPress Starter (Frontend)

Next.js (App Router) frontend that demonstrates fetching WordPress content via:
- REST (`/wp-json/wp/v2/...`)
- GraphQL (`/graphql`, via the WPGraphQL plugin)

## Requirements
- Node.js 20 LTS (see `frontend/.nvmrc`)
- A running WordPress site reachable from your machine
- WPGraphQL plugin if you want GraphQL (REST works without it)

## Setup
1) Configure env:
```bash
cp .env.example .env.local
```

2) Install and run:
```bash
npm install
npm run dev
```

3) Open `http://localhost:3000`

## Included routes
- `/` — homepage showing your WordPress site title + latest posts preview (REST).
- `/rest-posts` — list posts via REST, links to REST post detail.
- `/posts/[slug]` — REST post detail.
- `/graphql-posts` — list posts via GraphQL, links to GraphQL post detail.
- `/graphql-posts/[slug]` — GraphQL post detail.

## Environment variables
See `.env.example`:
- `NEXT_PUBLIC_WORDPRESS_REST_URL` — example: `http://localhost:8881/wp-json`
- `NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL` — example: `http://localhost:8881/graphql`
