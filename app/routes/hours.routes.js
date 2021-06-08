module.exports = app => {
    const hours = require("../controllers/hours.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", hours.create);
  
    // Retrieve all hours
    router.get("/", hours.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", hours.findOne);
  
    // Update a Tutorial with id
    router.put("/", hours.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", hours.delete);
  
    // Delete all hours
    router.delete("/", hours.deleteAll);
  
    app.use('/api/hours', router);
  };