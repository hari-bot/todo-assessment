import express from "express";
import "dotenv/config";

const PORT = process.env.PORT || 8080;
const app = express();

//Middlewares
app.use(morgan("short"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Todo Application" });
});

app.listen(PORT, () => {
  console.log(`Apllication is running on ${PORT}`);
});
