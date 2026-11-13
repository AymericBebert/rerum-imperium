# Rerum Imperium

Control your things!

This is a monorepo containing both the frontend and the backend of the project.

## Structure

- [`frontend/`](./frontend) — the Angular web application
- [`backend/`](./backend) — the Node.js API backend

See each project's own `README.md` for installation, development and build instructions.

## Continuous integration

Pull requests run frontend and backend lint and tests in separate GitHub Actions jobs.

## Build and publish a new version

We use GitHub Actions to build the Docker images on release.

In order to build new versions, you need to create a new release on GitHub, using semver tags.
Pushing a tag builds and publishes both the frontend (`rerum-imperium`) and backend
(`rerum-imperium-backend`) Docker images, then redeploys the Portainer stack with the new version.
The workflow requires the `DOCKER_HUB_USERNAME`, `DOCKER_HUB_ACCESS_TOKEN`, and
`PORTAINER_API_KEY` secrets, and the `PORTAINER_URL`, `PORTAINER_STACK_ID`, and
`PORTAINER_ENDPOINT_ID` repository variables.
