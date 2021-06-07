const express = require("express");
const cors = require("cors");
const path = require('path');
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

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application" });
});

//require("./src/routes/heroes.routes.js")(app);
//require("./src/routes/villains.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});