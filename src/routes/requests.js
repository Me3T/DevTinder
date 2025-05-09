const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", async (req, res) => {
  const user = req.user;

  console.log("Sending a connection request");

  res.send(user.firstName + "Connection request was sent");
});

module.exports = requestRouter;
