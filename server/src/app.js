import express from "express";
import bodyParcer from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import encryptRoutes from "./routes/encrypt.routes.js";
import fileUpload from "express-fileupload";

// CONFIG SERVER //
const app = express();

// CONFIGURATIONS MIDDLEWARES //
app.use(express.json());
app.use(fileUpload());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParcer.json({ limit: "30mb", extended: true }));
app.use(bodyParcer.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// CONFIGURATIONS ROUTES //
app.use("/auth", authRoutes);
app.use("/uploads", encryptRoutes);

export default app;
