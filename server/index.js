import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import helmet from "helmet";
import mongodbConnection from "./dbConfig/index.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import router from "./routes/index.js";
import mysqlConnection from "./dbConfig/mysql.js";
import cookieParser from "cookie-parser";
import eventRoutes from "./routes/eventRoutes.js";
import customRouter from "./crud/index.js";

const __dirname = path.resolve(path.dirname(""));

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "views/build")));

// middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Configure CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;

mongodbConnection();
mysqlConnection();

app.use(helmet());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(router);

// error middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});

app.listen(8800, () => {
  console.log(`Connected to MySQL`);
});
