const bcrypt = require("bcryptjs");
const { User } = require("../../modules/User");

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await User.findAll({});
        return users;
      } catch (e: any) {
        throw Error(e.message);
      }
    },
    user: async (parent: any, args: any) => {
      try {
        const id = args.id;
        const user = User.find({ id: id });
        return user;
      } catch (e) {
        throw "Failed to get User.";
      }
    },
  },

  Mutation: {
    createUser: async (parent: any, args: any) => {
      const { name, email, password, confirmPassword } = args.input;
      if (password !== confirmPassword) {
        return "Password does not matches. Please try again!";
      }
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = User.create({ name, email, password: hashedPassword });
        return user;
      } catch (e: any) {
        throw "Failed to create an User.";
      }
    },

    updatePassword: async (parent: any, args: any) => {
      const { id, newPassword } = args.input;
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      try {
        return hashedPassword;
      } catch (e) {
        throw "Failed to update the password";
      }
    },
  },
};

module.exports = { resolvers };
