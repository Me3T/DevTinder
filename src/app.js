const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
require("dotenv").config();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Added");
  } catch (error) {
    res.status(400).send("Error saving the user");
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(404).send("Email not found");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("User not found");
  }
});

app.delete("/delete", async (req, res) => {
  const userId = req.body.userId;

  try {
    const deluser = await User.findByIdAndDelete(userId);
    res.send("deleted successfully");
  } catch (err) {
    res.status(404).send("error deleting user");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
    });
    console.log(user);
    res.send("User updated");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Connection Established");
    app.listen(7777, () => {
      console.log("Server is Running");
    });
  })
  .catch((err) => {
    console.log("connection not established");
  });
