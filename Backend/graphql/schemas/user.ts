import { gql } from "../../utils//appsetup";

module.exports = gql`
  type User {
    id: String!
    name: String!
    email: String!
    password: String!
  }

  type Query {
    users: [RegisterResponse!]!
  }

  extend type Mutation {
    createUser(input: CreateUserInput!): RegisterResponse
    login(input: LoginUserInput!): LoginResponse
    updatePassword(input: updatePasswordInput!): RegisterResponse
  }

  type RegisterResponse {
    id: String!
    name: String!
    email: String!
  }

  type LoginResponse {
    id: String!
    name: String!
    email: String!
    token: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  input updatePasswordInput {
    email: String!
    password: String!
    newPassword: String!
  }
`;
