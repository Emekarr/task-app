const express = require("express");

//functions to run when routes are reached
const {
  saveUser,
  getAllUsers,
  getUserById,
  updateUserEntry,
} = require("../db/db");

//initialise router
const router = express.Router();

//route to save a user
router.post("/users", async (req, res) => {
  const user = await saveUser(req.body);

  if (!user)
    return res.status(404).send("Sorry. Please input valid user details.");
  res.send(user);
});

//get all users from database
router.get("/users", async (req, res) => {
  const users = await getAllUsers();

  if (!users)
    return res.status(500).send("There was an error with our server.");
  res.send(users);
});

router.get("/users/:id", async (req, res) => {
  const user = await getUserById(req.params.id);

  switch (user) {
    case undefined:
      res.status(500).send("Sorry. There is an error with our server.");
      break;
    case typeof user === "string":
      res.status(404).send(user);
      break;
    default:
      res.send(user);
      break;
  }
});

router.patch("/users/:id", async (req, res) => {
  const user = await updateUserEntry(req.params.id, req.body);

  switch (user) {
    case undefined:
      res.status(500).send("Sorry. There is an error with our server.");
      break;
    case typeof user === "string":
      res.status(404).send(user);
      break;
    default:
      res.send(user);
      break;
  }
});

module.exports = router;
