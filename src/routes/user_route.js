import express from "express";
const router = express.Router();

import {
  handleUserLogin,
  handleUserLogout,
  handleUserRegistration,
} from "../controllers/userController.js";

router.post("/login", handleUserLogin);
router.post("/register", handleUserRegistration);
router.get("/logout", handleUserLogout);

export default router;
