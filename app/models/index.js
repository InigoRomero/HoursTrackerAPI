const dbConfig = require("../config/db.config.js");
const mysql = require('mysql2/promise');
const Sequelize = require("sequelize");


module.exports = db = {};

initialize();

async function initialize() {
  //create DB if not exist
  const host = dbConfig.HOST, port = dbConfig.PORT, user = dbConfig.USER, password = dbConfig.PASSWORD;
  const connection = await mysql.createConnection({host , port, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.DB}\`;`);
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
  await sequelize.sync();
}

/*
const db = {};
const models = path.join(__dirname, '../models/sequelize'); // path to a models' folder

fs.readdirSync(models)
	.filter(function (file) {
		return file.indexOf('.') !== 0 && file.slice(-3) === '.js';
	})
	.forEach(function (file) {
		const model = require(path.join(models, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach(function (modelName) {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

// This creates the table if it doesn't exist (and does nothing if it already exists)
sequelize
	.sync()
	.then((_result) => {
		console.log('Sequelize: All models were synchronized successfully.');
	})
	.catch((err) => {
		console.log(err);
	});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
*/