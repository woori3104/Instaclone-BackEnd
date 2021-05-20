import { gql } from "apollo-server";

export default gql`
    type User {
        id: Int!
        firstName: String!
        lastName: String
        userName: String!
        email:    String!
        createdAt: String!
        updatedAt: String!
        bio: String
        avatar: String
         photos: [Photo]
        followers: [User]
        following: [User]
        totalFollowing: Int!
        totalFollowers: Int!
        isMe: Boolean!
        isFollowing: Boolean!
    }
`;