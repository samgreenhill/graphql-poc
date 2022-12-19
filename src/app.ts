import "reflect-metadata";
var express = require('express');
import { createHandler } from 'graphql-http/lib/use/express';
import { CircuitResolver } from "./resolvers/CircuitResolver";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { ConstructorResolver } from "./resolvers/ConstructorResolver";
import { DriverResolver } from "./resolvers/DriverResolver";
import { RaceResolver } from "./resolvers/RaceResolver";
import { ResultResolver } from "./resolvers/ResultResolver";

async function bootstrap() {

  const schema = await buildSchema({
    resolvers: [CircuitResolver, ConstructorResolver, DriverResolver, RaceResolver, ResultResolver],
    container: Container
  });

  // Create a express instance serving all methods on `/graphql`
  // where the GraphQL over HTTP express request handler is
  const app = express();
  app.all('/graphql', createHandler({ schema }));

  app.listen({ port: 4000 });
  console.log('Listening to port 4000');

}

bootstrap();