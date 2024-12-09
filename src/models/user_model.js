import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: [true, "this email already exists"],
      trim: true,
    },

    password: {
      type: String,
      required: [true, "passoword not provided"],
    },
    // to-do:: set-up oAuth Login
    // to-do:: add subscription model later
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return;
  }

  try {
    const SALT_ROUND = parseInt(process.env.SALT_ROUND);
    const hash = await bcrypt.hash(this.password, SALT_ROUND);
    this.password = hash;
    next();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

userSchema.statics.matchPasswordAndGenerateToken = async function (
  email,
  password
) {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    console.log("user not found");
  }
  console.log(user);
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    console.log("password incorrect");
    return;
  }
  const accessToken = generateToken(user._id, email);
  return accessToken;
};

const User = mongoose.model("User", userSchema);
export default User;
