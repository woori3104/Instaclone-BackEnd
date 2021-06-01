import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeProfile: (_, { userName }, {client}) =>
      client.user.findUnique({
        where: {
            userName,
        },
        // following중인 유저만 표시
        include: {
          following: true,
          followers: true,
        },
      }),
  },
};
export default resolvers;