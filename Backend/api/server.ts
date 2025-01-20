require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const helmet = require("helmet");
const { expressMiddleware } = require("@apollo/server/express4");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const typeDefs = require("../graphql/schemas");
const resolvers = require("../graphql/resolvers");
const context = require("../graphql/context");

import { Request } from "express";
import { PubSub } from "graphql-subscriptions";
import validateTokenAndGetUser from "../utils/validateTokenGetUser";

declare global {
  namespace Express {
    interface Request {
      headers: {
        authorization?: string;
      };
    }
  }
}

let apolloServer = null;

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

const server = createServer(app);

const pubsub = new PubSub();

async function startServer() {
  apolloServer = new ApolloServer({
    schema,
    context: async ({ req }: { req: Request }) => {
      const user = await validateTokenAndGetUser(req);
      return { user, pubsub };
    },
    introspection: true,
    playground: {
      settings: {
        "schema.polling.enable": false,
      },
    },
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/api" });
  app.use(expressMiddleware(apolloServer));
}
startServer();

const wsServer = new WebSocketServer({ server, path: "/api" });

const wsServerCleanup = useServer({ schema }, wsServer);

app.use(helmet());

// app.use(
//   cors({
//     origin: [
//       "https://react-ts-company-2023.vercel.app",
//       "https://react-ts-company-2023-production.up.railway.app/api",
//       "https://zephyron.onrender.com/api",
//       "http://localhost:3000",
//     ],
//     credentials: true,
//   }),
//   express.json()
// );

app.use(cors());
app.options("*", cors());

module.exports = server;
