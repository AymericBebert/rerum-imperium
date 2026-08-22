# Rerum Imperium Backend

Backend for Rerum Imperium project

## Installation

```shell
cp .env.dist .env
```

## Run the server

```shell
npm run start
```

## Run tests

```shell
npm run test
```

## Run lint

```shell
npm run lint
```

With auto fix
```shell
npm run lint:fix
```

## Build new version

We use GitHub Actions on tags to build the docker image

```shell
git tag 1.0.0
git push origin 1.0.0
```
