import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDb from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddlewares.js";
import { ListRoutes, MsCategoryRoutes, MsUserRoutes } from "./routes/index.js";

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 5000;

connectDb();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/category", MsCategoryRoutes);
app.use("/api/users", MsUserRoutes);
app.use("/api/list", ListRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server run on port : ${port}`);
});
