import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, { keyword }, { client }) =>
      client.user.findMany({
        where: {
          userName: {
            startsWith: keyword.toLowerCase(),
          },
        },
      }),
  },
};
export default resolvers;