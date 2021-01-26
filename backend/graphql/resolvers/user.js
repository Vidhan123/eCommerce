import generateToken from '../../utils/generateToken.js';
import User from '../../models/userModel.js';

// Auth user & get token
// Public
const authUser = async (args, req) => {
  try {
    const user = await User.findOne({ email: args.email });

    if (user && (await user.matchPassword(args.password))) {
      return {
        ...user._doc,
        token: generateToken(user._id),
      };
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Register a new user
// Public
const registerUser = async (args, req) => {
  try {
    const userExists = await User.findOne({ email: args.userInput.email });

    if (userExists) {
      throw new Error('User already exists');
    }

    const user = await User.create({
      name: args.userInput.name,
      email: args.userInput.email,
      password: args.userInput.password,
    });

    if (user) {
      return {
        ...user._doc,
        token: generateToken(user._id),
      };
    } else {
      throw new Error('Invalid user data');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Get user profile
// Private
const getUserProfile = async (args, req) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      return {
        ...user._doc,
      };
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Update user profile
// Private
const updateUserProfile = async (args, req) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = args.userInput.name || user.name;
      user.email = args.userInput.email || user.email;
      if (args.userInput.password) {
        user.password = args.userInput.password;
      }

      const updatedUser = await user.save();

      return {
        ...updatedUser._doc,
        token: generateToken(updatedUser._id),
      };
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Get all users
// Private/Admin
const getUsers = async (args, req) => {
  try {
    const users = await User.find({});
    return users;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Delete user
// Private/Admin
const deleteUser = async (args, req) => {
  try {
    const user = await User.findById(args.userId);

    if (user) {
      await user.remove();
      return { msg: 'User removed' };
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Get user by ID
// Private/Admin
const getUserById = async (args, req) => {
  try {
    const user = await User.findById(args.userId).select('-password');

    if (user) {
      return user;
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Update user
// Private/Admin
const updateUser = async (args, req) => {
  try {
    const user = await User.findById(args.userId);

    if (user) {
      user.name = args.userInput.name || user.name;
      user.email = args.userInput.email || user.email;
      user.isAdmin = args.userInput.isAdmin || user.isAdmin;

      const updatedUser = await user.save();

      return {
        ...updatedUser._doc,
      };
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
