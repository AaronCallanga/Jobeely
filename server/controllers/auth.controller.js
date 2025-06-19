import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  // const session = await mongoose.startSession();    // create a session object
  // session.startTransaction();      // start transaction

  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({email});

    // Check If user already exist
    if (existingUser) {
      throw new AppError("User already exist", 409);
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the User and destructure the returned array
    // const [newUser] = await User.create(
    //     [
    //           {    // Creating user with Array is important because we are attaching session
    //             email,
    //             password: hashedPassword,
    //             isVerified: false
    //           }
    //         ], {session});
    const newUser = await User.create({
      email,
      password: hashedPassword,
      isVerified: false,
    });

    // Commit to the database
    // await session.commitTransaction();
    // session.endSession()

    // Remove password to the user to be send
    const userToSend = newUser.toObject();
    delete userToSend.password;

    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN}); // add userRole: in the future

    res.status(201).send({
      success: true,
      message: "User sign up successfully",
      data: {
        token,
        user: userToSend
      }
    })

  } catch (error) {
    // await session.abortTransaction();   // roll back all changes
    // session.endSession()
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if (!user) {
      throw new AppError("User does not exist", 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid Password", 401);
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

    const userToSend = user.toObject();
    delete userToSend.password;

    res.status(200).send({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user: userToSend
      }
    })
  } catch (error) {
      next(error);
  }

};

export const signOut = async (req, res, next) => {
  const { email, passowrd } = req.body;

};

// install auth library
