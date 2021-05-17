import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Photo: {
        user: ({ userId }, { client }) => client.user.findUnique({ where: { id: userId } }),
        hashtags: ({ id }, { client }) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      }),
  },
}
export default resolvers;