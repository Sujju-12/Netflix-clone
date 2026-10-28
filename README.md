# Netflix Clone

A learning project for a streaming-catalog web application built with Next.js, React, TypeScript, Tailwind CSS, Supabase, and Vercel. It also includes an optional local Kubernetes + Argo CD path for practising GitOps with the same container image.

> This is an educational clone with original UI code and demo data. It is not affiliated with Netflix and does not include Netflix proprietary assets or content.

## Features

- Responsive dark streaming UI with featured titles, genre rows, search, and title detail pages.
- Demo catalog available without external credentials.
- Optional TMDB metadata integration through a server-side bearer token.
- Supabase PostgreSQL for title metadata and user watchlists.
- Supabase Auth with cookie-aware Next.js sessions using @supabase/ssr.
- Row-level security policies for user-owned watchlists.
- GitHub Actions quality checks and container publishing to GHCR.
- Vercel-ready Next.js deployment.
- Optional Helm chart and Argo CD Application for local Kind GitOps practice.
- Health endpoint, Dockerfile, sample environment file, and setup documentation.

## Stack

- Next.js App Router, React, TypeScript, Tailwind CSS
- TanStack Query for client-side data fetching/cache
- Supabase PostgreSQL + Supabase Auth
- Optional TMDB API for movie metadata
- Vercel for the hosted web app
- GitHub Actions, Docker, Trivy, Helm, Kind, Argo CD for delivery practice

### Authentication design

Supabase Auth is the single identity/session provider in this starter. Next.js sessions are handled with @supabase/ssr. Do not add a second independent NextAuth/Auth.js session system unless you intentionally design and test a migration/integration; two competing session authorities create unnecessary security and maintenance complexity.

## Quick start

Requirements: Node.js 22+, npm, and a Supabase project (optional for demo mode).

    npm install
    cp .env.example .env.local
    npm run dev

Open http://localhost:3000. Without Supabase or TMDB credentials, the homepage uses a built-in demo catalog. Sign-in, persistent watchlists, and database-backed catalog features require Supabase configuration.

## Environment variables

See .env.example. Only public Supabase project URL and anon/publishable key may be exposed to browser code. Never expose the Supabase service-role key. Database passwords and TMDB bearer tokens must remain server-side.

## Supabase setup

1. Create a Supabase project.
2. Copy the project URL and anon/publishable key to .env.local.
3. Run the SQL migration in supabase/migrations/202610290001_initial_schema.sql using the Supabase SQL editor or your migration workflow.
4. Configure your Supabase Auth site URL as http://localhost:3000 for local development and add the Vercel URL after deployment.
5. Configure redirect URLs for /auth/callback.
6. Keep Row Level Security enabled. Never commit secrets.

## Quality checks

    npm run lint
    npm run typecheck
    npm test
    npm run build

## Deploy to Vercel

1. Import this GitHub repository into Vercel.
2. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or the publishable key) to the appropriate Vercel environments.
3. Add TMDB_API_READ_ACCESS_TOKEN only if you want live TMDB metadata.
4. Set the production Supabase Auth site URL and redirect URLs.
5. Deploy. Pull requests and branches can use Vercel Preview Deployments.

Do not put private keys in NEXT_PUBLIC_* variables.

## Local GitOps practice (optional)

The primary web deployment target is Vercel. The same app can also be containerized and deployed to a local Kind cluster to practise GitOps.

Prerequisites: Docker, Kind, kubectl, Helm, and an accessible container registry for the image. Configure a Supabase URL/key as a Kubernetes Secret outside Git.

    kind create cluster --name netflix-lab
    kubectl create namespace netflix
    helm upgrade --install netflix-clone ./deploy/helm/netflix-clone --namespace netflix --set image.repository=ghcr.io/sujju-12/netflix-clone --set image.tag=latest
    kubectl -n netflix port-forward svc/netflix-clone 3000:3000

Then open http://localhost:3000. For Argo CD practice, review deploy/argocd/application.yaml, replace the repository URL if you forked it, install Argo CD in the cluster, and apply the Application manifest. Change the image tag in the Helm values through Git and observe Argo CD reconciliation. Avoid committing Kubernetes Secret values.

This local path is a practice environment, not a production security baseline. For a production deployment, pin image digests, harden policies and RBAC, configure TLS, manage secrets with an approved secret manager, and validate recovery procedures.

## Repository layout

    src/
      app/                 Next.js routes and API endpoints
      components/          Reusable UI
      lib/                 Catalog, Supabase clients, and types
    supabase/migrations/   SQL schema and RLS policies
    .github/workflows/     CI and container publishing
    deploy/helm/           Kubernetes Helm chart
    deploy/argocd/         Argo CD Application
    docs/                  Setup and GitOps runbook

## Content and API notes

The built-in catalog is illustrative metadata. Optional TMDB integration requires your own API credentials and compliance with TMDB's terms and attribution requirements. Use licensed/public-domain video for any playback demonstrations; do not redistribute copyrighted films or proprietary Netflix assets.
