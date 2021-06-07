module.exports = app => {
    const positions = require("../controllers/positions.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", positions.create);
  
    // Retrieve all positions
    router.get("/", positions.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", positions.findOne);
  
    // Update a Tutorial with id
    router.put("/", positions.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", positions.delete);
  
    // Delete all positions
    router.delete("/", positions.deleteAll);
  
    app.use('/api/positions', router);
  };