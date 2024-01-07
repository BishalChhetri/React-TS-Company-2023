import React from "react";
import { gql } from "@apollo/client";

export const QUERY_ALL_USERS = gql`
  query getAllUsers {
    users {
      id
      name
      email
    }
  }
`;

export const QUERY_MESSAGE = gql`
  query getMessage($input: GetMessageInput!) {
    messages(input: $input) {
      id
      text
      sender_id
      receiver_id
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation loginUser($input: LoginUserInput!) {
    login(input: $input) {
      id
      name
      email
      token
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($input: updatePasswordInput!) {
    updatePassword(input: $input) {
      id
      name
      email
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      id
      text
      sender_id
      receiver_id
      createdAt
      updatedAt
    }
  }
`;

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription newMessage($input: ReceiverIdInput!) {
    newMessage(input: $input) {
      id
      text
      sender_id
      receiver_id
      createdAt
      updatedAt
    }
  }
`;
