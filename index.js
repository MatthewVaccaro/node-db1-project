const server = require("./server.js");
const router = require("./subRouter");
const express = require("express");

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

//Sub Routes
server.use("/api/", router);

// Sanity Check Confirmed
server.get("/", (req, res) => {
  res.status(200).json({ message: "This worked" });
});
