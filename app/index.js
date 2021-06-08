const express = require("express");
const cors = require("cors");
const path = require('path');
var fs = require('fs');
const { Sequelize } = require('sequelize');

const app = express();
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


var corsOptions = {
  origin: "http://localhost:4200"
};

const db = require("./models");
db.sequelize.sync();
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application" });
});

require("./routes/users.routes.js")(app);
require("./routes/positions.routes.js")(app);
require("./routes/clients.routes.js")(app);
require("./routes/projects.routes.js")(app);
require("./routes/tasks.routes.js")(app);
require("./routes/hours.routes.js")(app);


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});