import { gql } from "apollo-server-express";

const userType = require("./user");
const messageType = require("./message");

const rootType = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

module.exports = [rootType, userType, messageType];
