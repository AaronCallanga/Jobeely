import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signUp = async (req, res, next) => {
  // const session = await mongoose.startSession();    // create a session object
  // session.startTransaction();      // start transaction

  try {
    const { email, password } = req.body;

    // 1. Delegate the core logic to the Service
    const { token, user } = await AuthService.signUpUser(email, password);

    res.status(201).send({
      success: true,
      message: "User sign up successfully",
      data: {
        token,
        user: userToSend,
      },
    });
  } catch (error) {
    // await session.abortTransaction();   // roll back all changes
    // session.endSession()
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

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

    res.status(200).send({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user: userToSend,
      },
    });
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res, next) => {
  const { email, passowrd } = req.body;
};

// install auth library - passport
const AuthController = {
  signIn,
  signOut,
  signUp,
};

export default AuthController;
