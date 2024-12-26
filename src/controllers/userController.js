import User from "../models/user_model.js";
// some error handlers

const handleUserRegistration = async (req, res, next) => {
  const { username, email, password } = req.body || req.query;

  if (!username || !email || !password) {
    console.log("input field cannot be empty");
  }

  // check whether the user exists already??
  const userExists = await User.findOne({ email });
  if (userExists) {
    // todo: add some error handler
    console.log("user already exists ");
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    // *** api ***
    // return res.status(200).json({
    //   message: "user created successfully",
    //   user,
    // });
    return res.redirect("/auth/login");
  } catch (error) {
    console.log(error.message);
  }
};

const handleUserLogin = async (req, res, next) => {
  const { email, password } = req.body || req.query;
  if (!email || !password) {
    console.log("input field cannot be empty");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("user not found: userController.js");
    }

    const accessToken = await User.matchPasswordAndGenerateToken(
      email,
      password
    );

    res.cookie("accessToken", accessToken); // add more options later httpOnly: true and secure : true

    // *** api ***
    // return res
    //   .status(200)
    //   .json({ message: "user logged in successfull", accessToken, user });

    return res.redirect("/editor");
  } catch (error) {
    console.log(error.message);
  }
};

const handleUserLogout = async (req, res, next) => {
  await res.clearCookie("accessToken");
  // *** api ***
  // return res.status(200).json({
  //   message: "logged out",
  // });

  return res.redirect("/");
};

export { handleUserRegistration, handleUserLogin, handleUserLogout };
