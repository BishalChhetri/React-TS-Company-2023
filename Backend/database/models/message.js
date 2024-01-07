"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.User, {
        foreignKey: "sender_id",
        as: "sender",
      });

      Message.belongsTo(models.User, {
        foreignKey: "receiver_id",
        as: "receiver",
      });
    }
  }
  Message.init(
    {
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      sender_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      receiver_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
