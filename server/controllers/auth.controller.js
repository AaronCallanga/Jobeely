import AuthService from "../service/auth.service.js";

const signUp = async (req, res, next) => {
  // const session = await mongoose.startSession();    // create a session object
  // session.startTransaction();      // start transaction

  try {
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
  } catch (error) {
    // await session.abortTransaction();   // roll back all changes
    // session.endSession()
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res, next) => { // blacklist token
  const { email, passowrd } = req.body;
};

// install auth library - passport
const AuthController = {
  signIn,
  signOut,
  signUp,
};

export default AuthController;
