const express = require("express");

//functions to run when routes are reached
const {
  saveTask,
  getAllTasks,
  getTaskById,
  updateTaskEntry,
} = require("../db/db");

//initialise router
const router = express.Router();

//route to save a task
router.post("/tasks", async (req, res) => {
  const task = await saveTask(req.body);

  if (!task)
    return res.status(404).send("Sorry. Please input valid task details.");
  res.status(200).send(task);
});

//get all tasks from database
router.get("/task", async (req, res) => {
  const result = await getAllTasks();

  if (!result)
    return res.status(500).send("There was an error with our server.");
  res.send(result);
});

router.get("/tasks/:id", async (req, res) => {
  const task = await getTaskById(req.params.id);

  switch (task) {
    case undefined:
      res.status(500).send("Sorry. There is an error with our server.");
      break;
    case typeof user === "string":
      res.status(404).send(task);
      break;
    default:
      res.send(task);
      break;
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const task = await updateTaskEntry(req.params.id, req.body);

  switch (task) {
    case undefined:
      res.status(500).send("Sorry. There is an error with our server.");
      break;
    case typeof task === "string":
      res.status(404).send(task);
      break;
    default:
      res.send(task);
      break;
  }
});

module.exports = router;
