import { v4 as uuid } from "uuid";
import { Op } from "sequelize";
import { PubSub } from "graphql-subscriptions";

const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../../database/models");
const { Message } = require("../../database/models");

const pubsub = new PubSub();

type message = {
  dataValues: object;
};

interface ReceiverIdInput {
  receiver_id: string;
}

const resolvers = {
  Query: {
    async messages(_: any, args: any, context: any) {
      const { sender_id, receiver_id } = args.input;
      const userId = context.user.dataValues.id;

      try {
        const user = await User.findByPk(userId);
        if (!user) {
          throw new AuthenticationError("You are not authorised.");
          return;
        }
        if (!sender_id || !receiver_id) return;

        const messagesResponse = await await Message.findAll({
          attributes: [
            "id",
            "text",
            "sender_id",
            "receiver_id",
            "createdAt",
            "updatedAt",
          ],
          where: {
            [Op.or]: [
              {
                sender_id: sender_id,
                receiver_id: receiver_id,
              },
              {
                sender_id: receiver_id,
                receiver_id: sender_id,
              },
            ],
          },
          order: [["createdAt", "ASC"]],
        });
        const messages = messagesResponse.map((message: message) => {
          return message.dataValues;
        });
        return messages;
      } catch (e: any) {
        throw new Error(e.message);
      }
    },
  },
  Mutation: {
    createMessage: async (_: any, args: any, context: any) => {
      const id = uuid();
      const userId = context.user.dataValues.id;

      try {
        const user = await User.findByPk(userId);
        if (!user) {
          throw new AuthenticationError("You are not authorised.");
          return;
        }

        const { text, sender_id, receiver_id } = args.input;
        const messages = await Message.create({
          id,
          text,
          sender_id,
          receiver_id,
        });
        const message = messages.dataValues;
        pubsub.publish(`NEW_MESSAGE_${message.receiver_id}`, {
          newMessage: message,
        });
        return message;
      } catch (e: any) {
        throw new Error(e.message);
      }
    },
  },
  Subscription: {
    newMessage: {
      subscribe: (_: any, { input }: { input: ReceiverIdInput }) => {
        if (!input || !input.receiver_id) {
          console.log("hey");
          throw new Error("Invalid input or missing receiver_id");
        }
        return pubsub.asyncIterator([`NEW_MESSAGE_${input.receiver_id}`]);
      },
    },
  },
};

module.exports = resolvers;
