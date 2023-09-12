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

## Dockerization

### Building an image

```bash
$ docker build -t usermetrics-backend:latest .
```

### Running a container

```bash
$ docker run -d -p 8080:8080 --name usermetrics-backend usermetrics-backend:latest
```

> NOTE: -d: This flag tells Docker to run the container in the background. The container will start and you'll be returned to your command prompt, allowing you to continue using the terminal for other tasks.

## Improvement ideas

- Implement user authentication
- Implement token-based authentication for API calls (e.g. JWT, OAuth2)
