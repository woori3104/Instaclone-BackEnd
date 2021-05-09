import {
  loadFilesSync,
  makeExecutableSchema,
  mergeResolvers,
  mergeTypeDefs,
} from "graphql-tools";
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(
  `${__dirname}/**/*.{queries,resolvers}.js`
);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);
