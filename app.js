const express = require("express");
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

const userRoute = require("./routes/users");

const rootRoute = "/";

app.use(rootRoute, userRoute);

app.use("/", (req, res) => {
  res.send("It works!");
});

module.exports = app;
