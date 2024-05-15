import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";

import userRoute from "./routes/users.js";
import tasksRoute from "./routes/tasks.js";

const PORT = process.env.PORT || 8080;
const app = express();

//Middlewares
app.use(morgan("short"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Todo Application API" });
});

app.use("/users", userRoute);
app.use("/tasks", tasksRoute);

mongoose
  .connect(process.env.MONGODBDB_URL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`Application is running at Port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
