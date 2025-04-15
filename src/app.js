const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Manmeet",
    lastName: "Rai",
    email: "m@r.com",
    password: "manmeet@123",
  });

  try {
    await user.save();
    res.send("User Added");
  } catch (error) {
    res.status(400).send("Error saving the user");
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
