# Usermetrics backend

## Description

This project was bootstrapped with [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This project uses SQLite3 as database. There are 100 social media posts stored in the database. There are two available endpoints: one for retrieving 10 posts per page and another for retrieving analytics dashboards for showcasing analytics on all 100 social media posts.

The basic authentication is used for the endpoints.

### Endpoints

- GET /usermetrics-v1/posts/:pageNumber

- GET /usermetrics-v1/dashboards

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Improvement ideas

- Use more stronger authentication method (e.g. JWT, OAuth2)
