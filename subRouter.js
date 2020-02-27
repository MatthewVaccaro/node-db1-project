const express = require("express");
const db = require("./data/dbConfig");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const accounts = await db("*").from("accounts");
    res.status(200).json(accounts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const accounts = await db("id")
      .from("accounts")
      .where({ id: req.params.id })
      .limit(1);
    res.status(200).json(accounts);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    postData = {
      name: req.body.name,
      budget: req.body.budget
    };
    const [id] = await db.insert(postData).into("accounts");
    const accounts = await db("id")
      .from("accounts")
      .where("id", id)
      .limit(1);
    res.status(201).json(accounts);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = await db("id")
      .from("accounts")
      .where("id", req.params.id);
    const account = await db("accounts")
      .where("id", req.params.id)
      .del();
    res
      .status(200)
      .json(id)
      .end();
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const edits = {
      name: req.body.name,
      budget: req.body.budget
    };
    const changes = await db("accounts")
      .where("id", req.params.id)
      .update(edits);
    res.status(200).json(changes);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
