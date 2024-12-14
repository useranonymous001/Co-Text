import express from "express";
const router = express.Router();
import { editorRouteHandler } from "../controllers/editorController.js";
import { checkAuthentication } from "../middlewares/auth.js";

router.get("/", checkAuthentication, editorRouteHandler);

export default router;
