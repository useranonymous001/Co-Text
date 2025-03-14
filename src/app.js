import express from "express";
const app = express();
import path from "node:path";
import { fileURLToPath } from "node:url";

// import helmet from "helmet";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user_route.js";
import editorRoutes from "./routes/editor_route.js";
import fileUpload from "express-fileupload";

// importing middlewares
import { checkAuthentication } from "./middlewares/auth.js";

// middlewares

// app.use(helmet());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.set(
//   "views",
//   path.join("B:", "Projects", "Real-Time-Text-Collaboration", "src", "views")
// );
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// user router
app.use("/auth", userRoutes);

app.use(checkAuthentication);

app.use("/editor", editorRoutes);

// error handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
  next();
});

// global error handler
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({ error: "internal server error" });
});

export default app;
