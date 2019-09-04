const express = require("express");
const router = express.Router();
const db = require("../data/db");

router.use(express.json());

//* GET ALL USERS
router.get("/", (req, res) => {
  try {
    db.find().then(response => {
      res.status(200).json(response);
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "The users information could not be retrieved." });
  }
});
//* GET USER BY ID
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    db.findById(id).then(response => {
      response
        ? res.status(200).json(response)
        : res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "The user information could not be retrieved." });
  }
});
//* POST NEW USER
router.post("/", (req, res) => {
  try {
    const { name, bio } = req.body;
    name || bio
      ? db.insert(req.body).then(response => {
          res.status(201).json(response);
        })
      : res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
  } catch (err) {
    res.status(500).json({
      error: "There was an error while saving the user to the database"
    });
  }
});
//* PUT UPDATE TO USER BY ID
router.put("/:id", (req, res) => {
  try {
    const { name, bio } = req.body;
    db.findById(req.params.id).then(response => {
      response
        ? name || bio
          ? db.update(req.params.id, req.body).then(() => {
              db.findById(req.params.id).then(response => {
                res.status(200).json(response);
              });
            })
          : res.status(400).json({
              errorMessage: "Please provide name and bio for the user."
            })
        : res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "The user information could not be modified." });
  }
});
//* DELETE USER BY ID
router.delete("/:id", (req, res) => {
  try {
    db.findById(req.params.id).then(response => {
      response
        ? db.remove(req.params.id).then(() => {
            res.status(200).json(response);
          })
        : res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
    });
  } catch (err) {
    res.status(500).json({ error: "The user could not be removed" });
  }
});

module.exports = router;
