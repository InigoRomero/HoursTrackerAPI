module.exports = app => {
    const clients = require("../controllers/clients.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", clients.create);
  
    // Retrieve all clients
    router.get("/", clients.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", clients.findOne);
  
    // Update a Tutorial with id
    router.put("/", clients.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", clients.delete);
  
    // Delete all clients
    router.delete("/", clients.deleteAll);
  
    app.use('/api/clients', router);
  };