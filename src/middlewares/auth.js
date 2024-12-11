import { validateToken } from "../utils/token.js";

const checkAuthentication = async (req, res, next) => {
  const token =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token missing." });
  }
  try {
    const decoded = await validateToken(token);
    if (decoded) {
      req.user = decoded;
      return next();
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.clearCookie("accessToken");
      res
        .status(400)
        .json({ message: `error occured in isLoggedIn ${error.message}` });
    } else {
      res.status(401).json({
        message: "401 unauthorized",
      });
    }
  }
};

export { checkAuthentication };
