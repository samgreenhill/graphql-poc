import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { CircuitResolver } from "./resolvers/CircuitResolver";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { ConstructorResolver } from "./resolvers/ConstructorResolver";
import { DriverResolver } from "./resolvers/DriverResolver";
import { RaceResolver } from "./resolvers/RaceResolver";

async function bootstrap() {

  const schema = await buildSchema({
    resolvers: [CircuitResolver, ConstructorResolver, DriverResolver, RaceResolver],
    container: Container
  });

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({ schema });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

bootstrap();