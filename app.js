import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/db.js";
import residentRouter from "./routes/resident.js";
import adminRouter from "./routes/admin.js";

const app = express();
config({ path: "./config/config.env" });

//----------------------------- middlewears ------------------------------
// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL],
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     credentials: true,
//   })
// );
// Allow requests from specific origins

app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// default route

app.get("/", async (req, res) => {
  res.json({ name: "hell1" });
});

// -------------------------- Calling DB CONNECTION ----------------------------------

dbConnection();

// -------------------------- Function routes -------------------------------

app.use("/api/v1/resident", residentRouter);
app.use("/api/v1/admin", adminRouter);

export default app;
