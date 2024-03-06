import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import mergedResolver from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolver,
});

const { url } = await startStandaloneServer(server);

console.log(`🚀 Server ready at ${url}`);
