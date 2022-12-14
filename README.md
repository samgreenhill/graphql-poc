# graphql-poc
[F1DB](http://ergast.com/mrd/db/)

Start the docker services
node /dist/app.js

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