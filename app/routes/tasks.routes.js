module.exports = app => {
    const tasks = require("../controllers/tasks.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", tasks.create);
  
    // Retrieve all tasks
    router.get("/", tasks.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", tasks.findOne);
  
    // Update a Tutorial with id
    router.put("/", tasks.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", tasks.delete);
  
    // Delete all tasks
    router.delete("/", tasks.deleteAll);
  
    app.use('/api/tasks', router);
  };