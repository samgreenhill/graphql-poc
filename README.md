# graphql-poc
[F1DB](http://ergast.com/mrd/db/)

1. Start the docker service
2. npm start

```
query Races {
  results {
    driver {
      surname
    }
    race {
      circuit {
        name
      }
    }
  }
}
```