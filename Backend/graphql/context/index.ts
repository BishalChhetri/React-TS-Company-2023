require("dotenv").config();
import { Request } from "express";

const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../../database/models");

const verifyToken = async (token: string) => {
  try {
    if (!token) return null;
    const { id } = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    return user;
  } catch (error: unknown) {
    if (error instanceof AuthenticationError) {
      throw error;
    }
    throw new AuthenticationError("Authentication failed");
  }
};

module.exports = async ({ req }: { req: Request }) => {
  const token = (req.headers && req.headers.authorization) || "";
  const user = await verifyToken(token);
  return { user };
};
