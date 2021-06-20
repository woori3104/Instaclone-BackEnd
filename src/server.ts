require("dotenv").config();
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import {typeDefs, resolvers} from "./schema";
import client from "./client";
import { getUser } from "./users/users.utils";
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  playground:true,
  introspection:true,
  context: async({req}) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      client,
    }
  },
    
});
const PORT = process.env.PORT

const app = express();


apollo.applyMiddleware({ app });
app.get("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use("/static", express.static("uploads"));

app.listen({ port: PORT }, () => {
  console.log(`🚀Server is running on http://localhost:${PORT}/graphql ✅`);
});