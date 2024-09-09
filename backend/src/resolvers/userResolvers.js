const { AuthenticationError, UserInputError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validateRegisterInput, validateLoginInput } = require('../utils/validation');
const config = require('../config');

const userResolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      return await User.findById(user.id);
    },
    getUser: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');
      return await User.findById(id);
    },
  },
  Mutation: {
    register: async (_, args) => {
      const { errors, valid } = validateRegisterInput(args);
      if (!valid) throw new UserInputError('Invalid input', { errors });

      const existingUser = await User.findOne({ email: args.email });
      if (existingUser) throw new UserInputError('Email is already taken');

      const newUser = new User(args);
      const savedUser = await newUser.save();

      const token = jwt.sign({ id: savedUser.id, email: savedUser.email }, config.jwtSecret, { expiresIn: '1d' });

      return { token, user: savedUser };
    },
    login: async (_, { email, password }) => {
      const { errors, valid } = validateLoginInput(email, password);
      if (!valid) throw new UserInputError('Invalid input', { errors });

      const user = await User.findOne({ email });
      if (!user) throw new UserInputError('User not found');

      const match = await user.comparePassword(password);
      if (!match) throw new UserInputError('Wrong credentials');

      const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: '1d' });

      return { token, user };
    },
    updateUser: async (_, args, { user }) => {
      if (!user) throw new AuthenticationError('You must be logged in');

      const updatedUser = await User.findByIdAndUpdate(user.id, args, { new: true });
      if (!updatedUser) throw new Error('User not found');

      return updatedUser;
    },
  },
};

module.exports = userResolvers;