require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({
    schema,
    context: {
        token:
        ""
    },
});
const PORT = process.env.PORT

server
    .listen(PORT)
    .then(() => console.log(`server is running on http://localhost:${PORT}/`));
