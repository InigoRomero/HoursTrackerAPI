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
db.client = require("./client.model.js")(sequelize, Sequelize);
db.hours = require("./hours.model.js")(sequelize, Sequelize);
// make relations
// users with position
db.users.belongsTo(db.positions);
db.positions.hasMany(db.users);
// users with project
db.projects.belongsToMany(db.users, { through: 'UsersOnProject' });
db.users.belongsToMany(db.projects, { through: 'UsersOnProject' });
// users with taks
db.tasks.belongsToMany(db.users, { through: 'UsersOnTask' });
db.users.belongsToMany(db.tasks, { through: 'UsersOnTask' });
// projects with clients
db.projects.belongsTo(db.client);
db.client.hasMany(db.projects);
//Hours with user + Project + Task
db.hours.belongsTo(db.users);
db.hours.belongsTo(db.projects);
db.hours.belongsTo(db.tasks);
db.users.hasMany(db.hours);
db.projects.hasMany(db.hours);
db.tasks.hasMany(db.hours);

module.exports = db;