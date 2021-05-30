require("dotenv").config();
import * as http from "http";
import * as express from "express";
import * as logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import {typeDefs, resolvers} from "./schema";
import { getUser } from "./users/users.utils";
import client from "./client";
import pubsub from "../pubsub";

const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({ req }) => {
        if (req) {
            return {
                loggedInUser: await getUser(req.headers.token),
                client,
            }
        }
    },
});
const PORT = process.env.PORT

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);
httpServer.listen({ port: PORT }, () => {
  console.log(`🚀Server is running on http://localhost:${PORT}/graphql  ✅`);
});