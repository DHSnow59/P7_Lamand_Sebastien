const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    // operatorsAliases: false, // probleme depreciation d'un boleen

    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
    },
});

// Connect all the models/tables in the database to a db object,
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
// importation des models juste en dessous 
db.user = require("../models/user.js")(sequelize, Sequelize);
db.post = require("../models/post.js")(sequelize, Sequelize);
db.comment = require("../models/comment.js")(sequelize, Sequelize);

// RELATION ONETOMANY //


module.exports = db;