import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input UpdatePasswordInput {
    id: ID!
    password: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updatePassword(input: UpdatePasswordInput!): User
  }
`;

export default typeDefs;
