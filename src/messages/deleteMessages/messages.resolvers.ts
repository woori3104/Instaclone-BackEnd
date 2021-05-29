import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { PrismaDelete } from "@paljs/plugins"

export default {
  Mutation: {
    deleteMessage: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const message = await client.message.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
        },
      });
      if (!message) {
        return {
          ok: false,
          error: "message not found.",
        };
      } else if (message.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Not authorized.",
        };
      } else {
        await client.message.delete({
          where: { id },
        });
        return {
          ok: true,
        };
      }
    }),
  },
};