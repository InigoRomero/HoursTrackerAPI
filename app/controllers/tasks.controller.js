const db = require("../models");
const Task = db.tasks;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.description || !req.body.status || !req.body.creatorId || !req.body.projectId) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Task
    const task = {
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      userId: req.body.creatorId,
      projectId: req.body.projectId
    };
  
    // Save Task in the database
    Task.create(task)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Task."
        });
      });
  };
  
  // Retrieve all Tasks from the database.
  exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Task.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Tasks."
        });
      });
  };
  
  // Find a single Task with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Task.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Task with id=" + id
        });
      });
  };
  
  // Update a Task by the id in the request
  exports.update = (req, res) => {
    const id = req.body.idTask;
    Task.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Task was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Task with id=" + id
        });
      });
  };
  
  // Delete a Task with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
    Task.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Task was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Task with id=" + id
        });
      });
  };
  
  // Delete all Tasks from the database.
  exports.deleteAll = (req, res) => {
    Task.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Tasks were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Tasks."
        });
      });
  };

  // Create and Save a new user to a Task
exports.addUser = (req, res) => {
  // Validate request
  if (!req.body.taskId || !req.body.userId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Project
  const participant = {
    taskId: req.body.taskId,
    userId: req.body.userId
  };
  // Save Project in the database
  db.usersOnTasks.create(participant)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Project."
    });
  });
};