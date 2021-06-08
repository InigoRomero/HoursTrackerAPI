const db = require("../models");
const Hour = db.hours;
const Op = db.Sequelize.Op;

// Create and Save a new Hour
exports.create = (req, res) => {
    // Validate request
    if (!req.body.startDate || !req.body.endDate || !req.body.userId || !req.body.projectId || !req.body.taskId ) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Hour
    const hour = {
        startDate: req.body.startDate,
      endDate: req.body.endDate,
      userId: req.body.userId,
      projectId: req.body.projectId,
      taskId: req.body.taskId
    };
  
    // Save Hour in the database
    Hour.create(hour)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Hour."
        });
      });
  };
  
  // Retrieve all Hours from the database.
  exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Hour.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Hours."
        });
      });
  };
  
  // Find a single Hour with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Hour.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Hour with id=" + id
        });
      });
  };
  
  // Update a Hour by the id in the request
  exports.update = (req, res) => {
    const id = req.body.idHour;
    Hour.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Hour was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Hour with id=${id}. Maybe Hour was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Hour with id=" + id
        });
      });
  };
  
  // Delete a Hour with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
    Hour.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Hour was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Hour with id=${id}. Maybe Hour was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Hour with id=" + id
        });
      });
  };
  
  // Delete all Hours from the database.
  exports.deleteAll = (req, res) => {
    Hour.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Hours were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Hours."
        });
      });
  };