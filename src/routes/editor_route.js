import express from "express";
const router = express.Router();

import {
  editorRouteHandler,
  handleUploadFile,
} from "../controllers/editorController.js";
import { checkAuthentication } from "../middlewares/auth.js";

router.get("/", checkAuthentication, editorRouteHandler);
router.post("/", handleUploadFile);

export default router;
