("use strict");

const { throws } = require("assert");
const express = require("express");

const fs = require("fs");

const dataPath = "./data/user.json";

const router = express.Router();

router.get("/users", (req, res) => {
  try {
    let rawdata = fs.readFileSync(dataPath);
    let users = JSON.parse(rawdata);

    return res.status(200).json({
      message: "Users retrived",
      success: true,
      users: users,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

router.put("/update/:id", (req, res) => {
  try {
    let rawdata = fs.readFileSync(dataPath);
    let users = JSON.parse(rawdata);
    let found = 0;

    for (let i = 0; i < users.length; i++) {
      if (req.params.id === users[i].id) {
        users[i].firstName = req.body.firstName;
        users[i].email = req.body.email;
        found = 1;
        break;
      }
    }

    if (found === 1) {
      //found
      let data = JSON.stringify(users);
      fs.writeFileSync(dataPath, data);
      return res.status(200).json({
        message: "User updated",
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

router.post("/add", (req, res) => {
  try {
    let rawdata = fs.readFileSync(dataPath);
    let users = JSON.parse(rawdata);

    for (let i = 0; i < users.length; i++) {
      if (req.body.email === users[i].email) {
        return res.status(400).json({
          message: "User already exists",
          success: false,
        });
      }
    }

    const id = Date.now(); //always new
    users[users.length] = {
      id: id + "",
      email: req.body.email,
      firstName: req.body.firstName,
    };
    let data = JSON.stringify(users);
    fs.writeFileSync(dataPath, data);
    return res.status(200).json({
      message: "User added",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

router.get("/user/:id", (req, res) => {
  try {
    let rawdata = fs.readFileSync(dataPath);
    let users = JSON.parse(rawdata);

    for (let i = 0; i < users.length; i++) {
      if (req.params.id === users[i].id) {
        return res.status(200).json({
          user: users[i],
          success: true,
        });
      }
    }

    return res.status(400).json({
      message: "User not found",
      success: false,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

module.exports = router;
