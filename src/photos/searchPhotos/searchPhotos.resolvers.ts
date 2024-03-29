import client from "../../client";

export default {
  Query: {
    searchPhotos: (_, { keyword , page=1}) =>
      client.photo.findMany({
        where: {
          caption: {
            contains: keyword,
          },
        },
        take: 5,
        skip: (page - 1) * 5,
      }),
  },
};