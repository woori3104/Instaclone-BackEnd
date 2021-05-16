import { gql } from "apollo-server";

export default gql`
   type EditProfileResult {
        ok: Boolean!
        error: String
    }
     type Mutation {
        createAccount(
            firstName: String!
            lastName: String
            userName: String!
            email:    String!
            password:String!
        ): User
    }
 `;
