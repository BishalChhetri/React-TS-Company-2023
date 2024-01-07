import { Request } from "express";
import { jwt } from "./appsetup";

const { ForbiddenError } = require("apollo-server-express");
const { User } = require("../database/models");

require("dotenv").config();

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  token: string;
}

const validateTokenGetUser = async (
  req: Request
): Promise<DecodedToken | null> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return null;
  }
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as DecodedToken;

    const user = await User.findOne({ where: { id: decodedToken.id } });
    if (!user) {
      return null;
    }

    return user;
  } catch (error: any) {
    throw new ForbiddenError(error.message);
  }
};

export default validateTokenGetUser;
