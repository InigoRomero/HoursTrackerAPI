const db = require("../models");
const Position = db.positions;
const Op = db.Sequelize.Op;

// Create and Save a new Position
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title || !req.body.eurosPerHour) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Position
    const position = {
        title: req.body.title,
        eurosPerHour: req.body.eurosPerHour
    };
  
    // Save Position in the database
    Position.create(position)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Position."
        });
      });
  };
  
  // Retrieve all Positions from the database.
  exports.findAll = (req, res) => {
    const tilte = req.query.tilte;
    var condition = tilte ? { tilte: { [Op.like]: `%${tilte}%` } } : null;
  
    Position.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Positions."
        });
      });
  };
  
  // Find a single Position with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Position.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Position with id=" + id
        });
      });
  };
  
  // Update a Position by the id in the request
  exports.update = (req, res) => {
    const id = req.body.idPosition;
    Position.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Position was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Position with id=${id}. Maybe Position was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Position with id=" + id
        });
      });
  };
  
  // Delete a Position with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
    Position.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Position was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Position with id=${id}. Maybe Position was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Position with id=" + id
        });
      });
  };
  
  // Delete all Positions from the database.
  exports.deleteAll = (req, res) => {
    Position.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Positions were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Positions."
        });
      });
  };