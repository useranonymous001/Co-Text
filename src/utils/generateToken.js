import jwt from "jsonwebtoken";

const generateToken = (userId, email) => {
  jwt.sign({ email, userId }, `${process.env.JWT_SECRET_KEY}`, (err, token) => {
    if (err) {
      console.log("error: handle me later ", err.message);
    }
    return token;
  });
};

export { generateToken };
