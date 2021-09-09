// import packages
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import chalk from "chalk";
import dotenv from "dotenv";
import cors from "cors";
// -- routes
import postRoute from "./api/routes/post.js";
// -- private keys
import { mongoURI } from "./api/config/keys.js";

// init
const server = express();

//middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("dev"));
server.use(cors());
// -- env
const envConfig = dotenv.config();
if (envConfig.error) {
  throw envConfig.error;
}
//-- connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//-- assign route
server.get("/", (req, res) => {
  res.send("worldcoinscollection Blog API");
});
server.use("/post/", postRoute);
// `server started on ${chalk.bgYellow.bold("PORT")} ${chalk.bgRed.bold(PORT)}`

// port listener
server.set("port", process.env.PORT || 5000);

server.listen(server.get("port"), function () {
  console.log("Node app is running at localhost:" + server.get("port"));
});
