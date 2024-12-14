import jwt from "jsonwebtoken";

const generateToken = async (user) => {
  try {
    const payload = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    if (!JWT_SECRET_KEY) {
      console.log("jwt secret key not provided");
      // to-do: handle error using classes
    }

    const token = await new Promise((resolve, reject) => {
      jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          reject(err.message);
        }
        resolve(token);
      });
    });
    return token;
  } catch (error) {
    console.log("error in generating token: " + error.message);
  }
};

const validateToken = (token) => {
  try {
    const valid = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    return valid;
  } catch (error) {
    console.log("error in validation, ", error.message);
  }
};

export { generateToken, validateToken };
