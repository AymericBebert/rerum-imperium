# Rerum Imperium

Control your things!

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4600/`. The app will automatically reload if you change any of the source files.

## Build and publish new version

We use GitHub Actions on tags to build the docker image

```shell
git tag 1.0.0
git push origin 1.0.0
```

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Run as static website
```bash
npm run build:prod
python3 -m http.server --directory dist/rerum-imperium 4600
```

## Analyze build
To analyze the build you can do :
```bash
npm run build:stats
npx webpack-bundle-analyzer dist/rerum-imperium/stats.json
```
