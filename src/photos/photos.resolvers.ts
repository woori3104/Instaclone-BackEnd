import { Resolvers } from "../types";

const resolvers: Resolvers = {
    Photo: {
        user: ({ userId }, { client }) => {
            return client.user.findUnique({
                where: { id: userId }
            });
        },
        hashtag: ({ id }, { client }) => {
            return client.hashtag.findMany({
                where: {
                    photos: {
                        some: {
                            id,
                        },
                    },
                },
            }),
        },
    },
};
export default resolvers;