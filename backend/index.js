import express from "express";

import http from "http";

import cors from "cors";
import dotenv from "dotenv";

import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";

import { ApolloServer } from "@apollo/server";

import { expressMiddleware } from "@apollo/server/express4";

import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildContext } from "graphql-passport";

import mergedResolver from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import { connectDB } from "./db/connectDB.js";
import { configurePassport } from "./passport/passport.config.js";

dotenv.config();
configurePassport();
const app = express();
const httpServer = http.createServer(app);

const MongoDBStore = connectMongo(session);
// Initialize the Mongo store using the default Memory store
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "session",
});

store.on("erro", (err) => console.log(err));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // option spacifies to whatever you save the session to store on every request
    saveUninitialized: false, // option spacifies wathever to save uninitialized session
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },

    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolver,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Ensure we wait for our server to start

await server.start();

// Set up our Express middleware to handle CORS, body parsing,

// and our expressMiddleware function.

app.use(
  "/graphql",

  cors({
    origin: "http://localhost:3000",
    origin: true,
  }),

  express.json(),

  // expressMiddleware accepts the same arguments:

  // an Apollo Server instance and optional configuration options

  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

// Modified server startup

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDB();

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
