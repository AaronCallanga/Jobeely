import AuthService from "../service/auth.service.js";
import catchAsync from "../utils/catchAsync.js";

const signUp = catchAsync(async (req, res, next) => {
  // const session = await mongoose.startSession();    // create a session object
  // session.startTransaction();      // start transaction
  const { email, password } = req.body;

  // 1. Delegate the core logic to the Service
  const { token, user } = await AuthService.signUp(email, password);

  res.status(201).send({
    success: true,
    message: "User sign up successfully",
    data: {
      token,
      user,
    },
  });
});

const signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const { user, token } = await AuthService.signIn(email, password);

  res.status(200).send({
    success: true,
    message: "User signed in successfully",
    data: {
      token,
      user,
    },
  });
});

const signOut = async (req, res, next) => {
  // blacklist token
  const { email, passowrd } = req.body;
};

// install auth library - passport
const AuthController = {
  signIn,
  signOut,
  signUp,
};

export default AuthController;
