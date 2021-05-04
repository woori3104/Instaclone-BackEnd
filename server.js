import client from "./client"
import { ApolloServer } from "apollo-server";
import {typeDefs, resolvers} from "./schema";

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server
    .listen()
    .then(() => console.log("server is running on http://localhost:4000/"));