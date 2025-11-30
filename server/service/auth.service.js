import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";

const signUp = async (email, password) => {
  // 1. Check If user already exists (BUSINESS LOGIC)
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exist", 409);
  }

  // 2. Hash the password (BUSINESS LOGIC)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3. Create the User (BUSINESS LOGIC)
  const newUser = await User.create({
    email,
    password: hashedPassword,
    isVerified: false,
  });

  // 4. Prepare data and token
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  }); // add userRole: in the future
  const userToSend = newUser.toObject();
  delete userToSend.password;

  return { token, user: userToSend };
};

const signIn = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User does not exist", 404);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid Password", 401);
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const userToSend = user.toObject();
  delete userToSend.password;

  return {token, user: userToSend}
};

const AuthService = {
  signUp,
  signIn,
};

export default AuthService;
