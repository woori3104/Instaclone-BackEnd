import client from "../../client";
export default {
  Query: {
      seeProfile:(_, {userName}) => client.user.findUnique({
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