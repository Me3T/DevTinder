const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //* Validation of data

    validateSignUpData(req);

    //* Encrypt the password
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    //* Creating a new instance of the User
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added");
  } catch (error) {
    res.status(400).send("Some Error saving the user !" + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const passwordCheck = await user.validatePassword(password);

    if (passwordCheck) {
      const token = await user.getJWT();

      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);

      res.cookie("token", token, {
        expires: expiryDate,
      });

      res.send("Login Successfull !!");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res
      .status(400)
      .send("Error Logging in Please check credentials" + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("You have been logged out successfully");
});

module.exports = authRouter;
