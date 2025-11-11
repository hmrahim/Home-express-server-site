const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const port = 5000;
// require("dotenv").config();
const cors = require("cors");
const router = require("./router/routes");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const middleware = [
  express.json(),
  express.urlencoded({ extended: true }),
  cors(),
];
app.use(middleware);
app.use("/api", router);

const uri = "mongodb+srv://homeexpress:U5r71Qds0oSoPdyz@cluster0.ppelofb.mongodb.net/?appName=Cluster0"

mongoose.connect(uri).then(() => {
  console.log("database is connected");
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
