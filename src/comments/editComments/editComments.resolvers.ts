import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
export default {
  Mutation: {
    editComment: protectedResolver(
      async (_, { id, payload }, { loggedInUser }) => {
        const oldComment = await client.comments.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          select: {
            userId:true,
          },
        });
        if (!oldComment) {
          return {
            ok: false,
            error: "Commnet not found.",
          };
        }
        await client.photo.update({
          where: {
            id,
          },
          data: {
            payload,
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};