# rabbit

```
tsc main.ts && node main.js
```

## Two Phases

The way I prefer to mock for full stack development is to split API design into two phases: [json-server](https://github.com/typicode/json-server) and actual API.

## Phase 1

The goal is to do UI first development. That means the least amount of friction to get mock data over the wire the better. And the best solution for that is to load fake JSON data into json-server. By doing it this way, we don't have to mess with database fields, joins, API development, etc. We can just roughly describe our data and get going.

### Local and Online

We can run the mock data locally, but then it's good to get it online (usually Heroku), so that we can test it on devices easily, and send it to others for testing.

## Phase 2

Once you have a good idea of what your data is going to look like, you can start to lock it in. This is where you turn to building the models in the actual API. Once the models are built and the databases are set up, we can enter fake data into the test database. This way we can slowly change the API calls in the client from json-server to the real deal.
