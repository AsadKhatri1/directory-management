import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/db.js";
import residentRouter from "./routes/resident.js";

const app = express();
config({ path: "./config/config.env" });

//----------------------------- middlewears ------------------------------
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// -------------------------- Calling DB CONNECTION ----------------------------------

dbConnection();

// -------------------------- Function routes -------------------------------

app.use("/api/v1/resident", residentRouter);

export default app;
