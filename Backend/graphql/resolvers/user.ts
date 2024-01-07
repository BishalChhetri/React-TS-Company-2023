require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../../database/models");

import { v4 as uuid } from "uuid";

type data = {
  dataValues: object;
};

module.exports = {
  Query: {
    async users() {
      try {
        const userDataResponse = await User.findAll({});
        const userData = userDataResponse.map((data: data) => {
          return data.dataValues;
        });
        return userData;
      } catch (e: any) {
        throw new Error("e.message");
      }
    },
  },
  Mutation: {
    async createUser(parent: any, args: any) {
      const id = uuid();
      const { name, email, password } = args.input;
      const user = User.create({ id, name, email, password });
      return user;
    },

    async login(parent: any, args: any) {
      const { email, password } = args.input;
      const user = await User.findOne({ where: { email } });
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        return { ...user.toJSON(), token };
      }
      throw new AuthenticationError("Invalid credentials");
    },

    async updatePassword(parent: any, args: any, context: any) {
      const { email, password, newPassword } = args.input;

      const userId = context.user.dataValues.id;
      try {
        const user = await User.findByPk(userId);

        if (user && bcrypt.compareSync(password, user.dataValues.password)) {
          const hashedPassword = bcrypt.hashSync(newPassword, 10);

          const updateUser = await user.update({ password: hashedPassword });

          return updateUser;
        }

        throw new AuthenticationError("Invalid Email or Password.");
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
  },
};
