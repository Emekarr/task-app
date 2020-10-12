//import all modules needed for work
const express = require("express");
const usersRouter = require("../scripts/routes/usersroute");
const taskRouter = require("../scripts/routes/tasksroute");

// server nitialisation
const server = express();

//enable automatic decoding of json
server.use(express.json());

//register routers
server.use(usersRouter);
server.use(taskRouter);

const PORT = process.env.PORT || 3000;

server.listen(PORT);
