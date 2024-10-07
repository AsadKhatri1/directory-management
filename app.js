import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import { dbConnection } from "./database/db.js";
import residentRouter from "./routes/resident.js";
import adminRouter from "./routes/admin.js";
import expenseRouter from "./routes/expense.js";
import accRouter from "./routes/acc.js";
import incomeRouter from "./routes/income.js";
import "./scheduler.js"; // Import the scheduler

const app = express();
config({ path: "./config/config.env" });

// const upload = multer({ dest: "upload/" });
//----------------------------- middlewears ------------------------------
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
// Allow requests from specific origins
app.use(cors());

// app.use(
//   cors({
//     origin: "*",
//   })
// );
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   // Add other CORS headers if needed
//   next();
// });
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );

// default route

app.get("/", async (req, res) => {
  res.json({ name: "hell1" });
});

// uploading photos

// -------------------------- Calling DB CONNECTION ----------------------------------

dbConnection();

// -------------------------- Function routes -------------------------------

app.use("/api/v1/resident", residentRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/expense", expenseRouter);
app.use("/api/v1/acc", accRouter);
app.use("/api/v1/income", incomeRouter);

export default app;
