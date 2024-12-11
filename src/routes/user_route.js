import express from "express";
const router = express.Router();

import {
  handleUserLogin,
  handleUserLogout,
  handleUserRegistration,
} from "../controllers/userController.js";

router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", handleUserRegistration);

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", handleUserLogin);
router.get("/logout", handleUserLogout);

export default router;
