# Deployment Notes

## Vercel (primary)

1. Import this repository into Vercel using the Next.js framework preset.
2. Configure SUPABASE_URL and SUPABASE_ANON_KEY in Vercel environment variables.
3. Optionally configure TMDB_API_READ_ACCESS_TOKEN for live catalog metadata.
4. Set the Supabase Auth site URL and redirect URLs to your Vercel deployment URL.
5. Never expose the Supabase service-role key in browser code or commit secrets.

## CI and containers

CI validates lint, TypeScript, unit tests, and production build. The container workflow publishes a SHA-tagged image to GHCR and scans it with Trivy. Configure package visibility or image-pull credentials before pulling private GHCR images. Update the Helm image tag through a reviewed Git change.

## GitOps versus Vercel

Vercel's Git integration is the hosted deployment path. Argo CD and Helm are included for local Kubernetes GitOps practice as a separate deployment target.
