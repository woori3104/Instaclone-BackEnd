import { gql } from "apollo-server";

export default gql`
  type Query {
    seeFollowing(userName: String!, lastId: Int): MutationResponse!
  }
`;