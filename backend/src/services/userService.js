import User from "../models/User"; // Assuming you have a User model
import { findOne, genSalt, hash, compare } from "bcrypt"; // Assuming you're using bcrypt for password hashing
import User, { findOne, findById, findByIdAndDelete } from "../model/userModal";
import { sign } from "jsonwebtoken";

async function createUser(data) {
  const { userName, password, role, email } = data;
  try {
    // Input validation
    if (!userName || !role || !password || !email) {
      throw new Error("Something is missing.");
    }
    // Check if the user already exists
    const userExists = await findOne({ userName });
    if (userExists !== null) {
      throw new Error("User Already Exists");
    }
    // Hash the password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    // Create a new user object
    const newUser = new User(data);
    // Save the user to the database
    await newUser.save();
    return { message: "User Successfully created", status: true };
  } catch (error) {
    throw error; // Propagate the error up to the controller
  }
}

async function loginUser(userName, password) {
  try {
    const user = await findOne({
      userName: userName,
    });
    if (!user) {
      return null; // User not found
    }
    const passwordChecker = await compare(password, user.password);
    if (!passwordChecker) {
      return null; // Password is incorrect
    }
    // User and password are correct, generate a token
    const token = sign(
      {
        userName: user.userName,
        password: user.password,
        _id: user._id,
      },
      "secret_is_a_secret_for_user",
      {
        expiresIn: "1d",
      }
    );

    return token;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function updateUser(_id, updatedUserData) {
  try {
    const existingUser = await findById(_id);
    if (!existingUser) {
      return null; // User not found
    }

    existingUser.userName = updatedUserData.userName;
    existingUser.role = updatedUserData.role;

    const updatedUser = await existingUser.save();
    return updatedUser; // Return the updated user object
  } catch (err) {
    console.log(err);
    throw err; // Handle errors in the controller
  }
}

async function deleteUserById(_id) {
  try {
    const existingUser = await findById(_id);
    if (!existingUser) {
      return false; // User doesn't exist or is already deleted
    }
    await findByIdAndDelete(_id);
    return true; // User was successfully deleted
  } catch (err) {
    console.log(err);
    throw err; // Handle errors in the controller
  }
}

export default {
  createUser,
  loginUser,
  updateUser,
  deleteUserById,
};
