# Local GitOps Lab

Vercel is the primary hosted deployment target. This optional path deploys the same app to Kind.

    npm install
    npm run lint
    npm run typecheck
    npm test
    npm run build
    docker build -t netflix-clone:local .
    kind create cluster --name netflix-lab
    kind load docker-image netflix-clone:local --name netflix-lab
    helm upgrade --install netflix-clone ./deploy/helm/netflix-clone --namespace netflix --create-namespace --set image.repository=netflix-clone --set image.tag=local --set image.pullPolicy=IfNotPresent
    kubectl -n netflix port-forward svc/netflix-clone 3000:3000

Open http://localhost:3000. For Supabase, create a Kubernetes Secret locally and never commit it:

    kubectl -n netflix create secret generic netflix-clone-secrets --from-literal=SUPABASE_URL='YOUR_PROJECT_URL' --from-literal=SUPABASE_ANON_KEY='YOUR_ANON_KEY'

Install Argo CD in the local cluster using its official getting-started guide, then apply deploy/argocd/application.yaml. Ensure the chart references an image accessible to the cluster.

Practice: change replicaCount in Git, observe sync, manually change a live replica count, diagnose a nonexistent image tag, restore a known-good tag, and inspect pod events. Do not enable automated pruning until you understand what it can delete. Enable HPA only after installing metrics-server.
