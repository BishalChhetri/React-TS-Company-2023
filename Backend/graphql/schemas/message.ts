import { gql } from "../../utils//appsetup";

module.exports = gql`
  type Message {
    id: String!
    text: String!
    sender_id: String!
    receiver_id: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    messages(input: GetMessageInput!): [GetMessageResponse!]!
  }

  extend type Mutation {
    createMessage(input: CreateMessageInput!): CreateMessageResponse!
  }

  input CreateMessageInput {
    text: String!
    sender_id: String!
    receiver_id: String
  }

  type CreateMessageResponse {
    id: String!
    text: String!
    sender_id: String!
    receiver_id: String!
    createdAt: String!
    updatedAt: String!
  }

  input GetMessageInput {
    sender_id: String!
    receiver_id: String!
  }

  type GetMessageResponse {
    id: String!
    text: String!
    sender_id: String!
    receiver_id: String!
    createdAt: String!
    updatedAt: String!
  }

  type Subscription {
    newMessage(input: ReceiverIdInput!): Message!
  }

  input ReceiverIdInput {
    receiver_id: String!
  }

  type Message {
    id: String!
    text: String!
    sender_id: String!
    receiver_id: String!
    createdAt: String!
    updatedAt: String!
  }
`;
