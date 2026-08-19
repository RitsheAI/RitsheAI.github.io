# RitsheAI Portfolio Website

The official RitsheAI portfolio and technology laboratory — a personal site for AI, software, developer tools, web experiences, automation, and open-source work by **Ritesh Pandey**.

## Features

- Responsive, accessible single-page portfolio experience
- Data-driven projects, tools, practice areas, and writing
- Project filtering, command palette (`Cmd/Ctrl + K`), theme toggle, mobile navigation, and reduced-motion support
- Interactive RitsheAI Lab terminal
- Contact form with local validation
- SEO metadata, sitemap, robots file, favicon, and installable web manifest

## Local development

```bash
# Install dependencies (from workspace root)
pnpm install

# Run the dev server at http://localhost:5173
pnpm --filter @workspace/ritsheai-website run dev
```

For a production build:

```bash
pnpm --filter @workspace/ritsheai-website run build
pnpm --filter @workspace/ritsheai-website run typecheck
```

The output is written to `artifacts/ritsheai-website/dist/public`.

## Content

Edit `src/data/portfolio.ts` to update projects, tools, and blog entries with confirmed RitsheAI work.

## Deployment

The app is a static Vite build compatible with **Vercel**, **Netlify**, or any static host:

| Setting | Value |
|---|---|
| Install command | `pnpm install` |
| Build command | `pnpm --filter @workspace/ritsheai-website run build` |
| Output directory | `artifacts/ritsheai-website/dist/public` |

Set the custom domain to `ritsheai.com` and redirect `www.ritsheai.com` to it.

## Environment variables

Copy `.env.example` to `.env.local` if you add a mail service or analytics provider. No environment variables are required to run the site.

| Variable | Purpose |
|---|---|
| `VITE_CONTACT_ENDPOINT` | Mail service endpoint for the contact form |
| `VITE_ANALYTICS_ID` | Analytics provider ID |
| `PORT` | Dev server port (default: `5173`) |
| `BASE_PATH` | Base URL path (default: `/`) |

## License

MIT