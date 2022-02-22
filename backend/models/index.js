const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,

    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
    },
});

//Création de l'objet Database
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
// importation des models juste en dessous 
db.user = require("../models/user.js")(sequelize, Sequelize);
db.post = require("../models/post.js")(sequelize, Sequelize);
db.comment = require("../models/comment.js")(sequelize, Sequelize);

// RELATION ONETOMANY //
db.comment.belongsTo(db.post, {
    onDelete: "CASCADE",
});
db.post.hasMany(db.comment);
db.post.belongsTo(db.user);
db.user.hasMany(db.post);

module.exports = db;