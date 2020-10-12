const mongoose = require("mongoose");
const User = require("./models/users");
const Task = require("./models/task");
const { updateOne } = require("./models/users");

//connect to a database
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// function runs to save a user to mongodb
const saveUser = async (userDetails) => {
  const newUser = new User(userDetails);
  let savedUser;
  try {
    savedUser = await newUser.save();
  } catch (e) {}

  return savedUser;
};

// function runs to save a task to mongodb
const saveTask = async (taskDetails) => {
  const newTask = new Task(taskDetails);
  let savedTask;
  try {
    savedTask = await newTask.save();
  } catch (e) {}

  return savedTask;
};

// get all users saved in database
const getAllUsers = async () => {
  let allUsers;
  try {
    allUsers = await User.find();
    if (!allUsers) allUsers = "Sorry. There are currently no users.";
  } catch (e) {}

  return allUsers;
};

// get all task saved in database
const getAllTasks = async () => {
  let allTask;
  try {
    allTask = await Task.find();
    if (!allTask) allTask = "Sorry. There are currently no users.";
  } catch (e) {}

  return allTask;
};

//get a single user by his id
const getUserById = async (_id) => {
  let user;
  try {
    user = await User.findById({ _id });
    if (!user) user = "No user was found. Check your id.";
  } catch (e) {}

  return user;
};

//get a single user by his id
const getTaskById = async (_id) => {
  let task;
  try {
    task = await Task.findById({ _id });
    if (!task) task = "No task was found. Check your id.";
  } catch (e) {}

  return task;
};

//update the user entries using patch
const updateUserEntry = async (_id, updates) => {
  let user;

  try {
    user = await User.findById(_id);

    if (!user) return (user = "This user does not exist");
    const updateKeys = Object.keys(updates);
    updateKeys.forEach((key) => {
      user[key] = updates[key];
    });
    user.save();
  } catch (e) {}

  return user;
};

//update the task entries using patch
const updateTaskEntry = async (_id, updates) => {
  let task;

  try {
    task = await Task.findById(_id);

    if (!task) return (task = "This user does not exist");
    const updateKeys = Object.keys(updates);
    updateKeys.forEach((key) => {
      task[key] = updates[key];
    });
    task.save();
  } catch (e) {}

  return task;
};

module.exports = {
  saveUser,
  getAllUsers,
  getUserById,
  updateUserEntry,
  saveTask,
  getAllTasks,
  getTaskById,
  updateTaskEntry,
};
