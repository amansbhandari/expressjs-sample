const express = require("express");

const router = express.Router();

// const users = require("../data/users");

router.get("/users", (req, res) => {
  try {
    return res.status(200).json({
      message: "user retrived",
      success: true,
    });
  } catch (err) {}
});

module.exports = router;
