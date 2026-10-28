SHELL := /bin/bash
.PHONY: install dev lint typecheck test build docker-build kind-create kind-load helm-install kind-port-forward clean
install:
	npm install
dev:
	npm run dev
lint:
	npm run lint
typecheck:
	npm run typecheck
test:
	npm test
build:
	npm run build
docker-build:
	docker build -t netflix-clone:local .
kind-create:
	kind create cluster --name netflix-lab
kind-load:
	kind load docker-image netflix-clone:local --name netflix-lab
helm-install:
	helm upgrade --install netflix-clone ./deploy/helm/netflix-clone --namespace netflix --create-namespace --set image.repository=netflix-clone --set image.tag=local --set image.pullPolicy=IfNotPresent
kind-port-forward:
	kubectl -n netflix port-forward svc/netflix-clone 3000:3000
clean:
	kind delete cluster --name netflix-lab
