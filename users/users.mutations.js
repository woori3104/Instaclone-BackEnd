import client from "../client";
export default {
  Mutation: {
    createAccount: (_, { firstName, userName, email }) =>
      client.User.create({
        data: {
          firstName,
          userName,
          email,
        },
      }),
  },
};