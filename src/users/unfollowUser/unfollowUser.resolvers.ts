import { protectedResolver } from "../users.utils";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { userName }, { loggedInUser, client }) => {
        const ok = await client.user.findUnique({
          where: { userName },
        });
        if (!ok) {
          return {
            ok: false,
            error: "Can't unfollow user.",
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
            data: {
              // 누가 나를 업뎃하면 자동으로 업뎃
            following: {
              disconnect: {
                userName,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
export default resolvers;