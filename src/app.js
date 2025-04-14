const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ name: "Manmeet Rai" });
});

app.post("/user", (req, res) => {
  res.send("Hello from user");
});

app.use("/test", (req, res) => {
  res.send("Hello from test");
});

app.listen(7777, () => {
  console.log("Server is Running");
});
