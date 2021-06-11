module.exports = app => {
    const users = require("../controllers/users.controller.js");
    const middlewares = require("../middlewares/hours.middlewares.js");
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", middlewares.isTime, users.create);
  
    // Retrieve all users
    router.get("/", middlewares.isTime, users.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", users.findOne);
  
    // Update a Tutorial with id
    router.put("/", users.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", users.delete);
  
    // Delete all users
    router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
  };