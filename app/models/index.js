const dbConfig = require("../config/db.config.js");
const mysql = require('mysql2/promise');
const Sequelize = require("sequelize");

//initialize();

const db = {};

//inizializate Sequelize
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
//load models
db.users = require("./users.model.js")(sequelize, Sequelize);
db.positions = require("./positions.model.js")(sequelize, Sequelize);
db.projects = require("./projects.model.js")(sequelize, Sequelize);
db.tasks = require("./tasks.model.js")(sequelize, Sequelize);
db.clients = require("./clients.model.js")(sequelize, Sequelize);
db.hours = require("./hours.model.js")(sequelize, Sequelize);
db.usersOnProjects = require("../models/usersOnProject.model.js")(sequelize, Sequelize);
db.usersOnTasks = require("./usersOnTasks.model.js")(sequelize, Sequelize);

// ***** RELATIONS *****

// users with position
db.users.belongsTo(db.positions, {as: 'Position'});
db.positions.hasMany(db.users);
// users with project
db.projects.belongsToMany(db.users, { through: 'UsersOnProjects', as: 'participantsProject'});
db.users.belongsToMany(db.projects, { through: 'UsersOnProjects', as: 'participantProject'});
// users with taks
db.tasks.belongsToMany(db.users, { through: 'UsersOnTasks', as: "participantsTask"});
db.users.belongsToMany(db.tasks, { through: 'UsersOnTasks', as: "participantTask"});
//task with creator and project
db.tasks.belongsTo(db.projects);
db.projects.hasMany(db.tasks);
db.tasks.belongsTo(db.users);
db.users.hasMany(db.tasks, {as: 'taskCreator'});
// projects with clientss
db.projects.belongsTo(db.clients);
db.clients.hasMany(db.projects);
//Hours with user + Project + Task
db.hours.belongsTo(db.users);
db.hours.belongsTo(db.projects);
db.hours.belongsTo(db.tasks);
db.users.hasMany(db.hours);
db.projects.hasMany(db.hours);
db.tasks.hasMany(db.hours);

// ****** SCOPES *******

db.users.addScope('includeMain', {
  include: [{
    model: db.positions, // *** POSITIONS ***
    attributes: {
      exclude: ['deletedAT', 'updatedAt', 'createdAt', 'PositionId']
    },
    as: "Position"
  },
  {
    model: db.hours, // *** HOURS ***
    attributes: {
      exclude: ['deletedAT', 'updatedAt', 'createdAt', 'userId', 'projectId']
    },
    include: [{
      model: db.projects,
      attributes: {
        exclude: ['deletedAT', 'updatedAt', 'createdAt', 'clientId']
      },
      include: [{
        model: db.clients,
        attributes: {
          exclude: ['deletedAT', 'updatedAt', 'createdAt']
        },
        required: true
      }]
    }],
    include: [{
      model: db.tasks,
      attributes: {
        exclude: ['deletedAT', 'updatedAt', 'createdAt', 'userId']
      }
    }]
  },
  {
    model: db.tasks, // *** TASKS CREATOR ***
    attributes: {
      exclude: ['deletedAT', 'updatedAt', 'createdAt']
    },
    as: "taskCreator",
  },
  {
    model: db.tasks, // *** TASKS PARTICIPANT ***
    attributes: {
      exclude: ['deletedAT', 'updatedAt', 'createdAt']
    },
    as: "participantTask",
    through: {attributes: []},
  },
  {
    model: db.projects, // *** PROJECTS PARTICIPANT ***
    attributes: {
      exclude: ['deletedAT', 'updatedAt', 'createdAt', 'clientId']
    },
    as: "participantProject",
    through: {attributes: []},
    include: [{
      model: db.clients,
      attributes: {
        exclude: ['deletedAT', 'updatedAt', 'createdAt']
      },
      required: true
    }]
  }
  ]});

module.exports = db;