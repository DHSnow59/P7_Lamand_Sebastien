const express = require('express');

const app = express();

//Importation du router user
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Importation des models et on syncronise avec la BDD 
const db = require("./models");
db.sequelize.sync({
    force: true
});

app.use('/api/users', userRoutes);
//Nous voulons enregistrer notre routeur pour toutes les demandes effectuées vers /api/post
app.use('/api/posts', postRoutes);
//Nous voulons enregistrer notre routeur pour toutes les demandes effectuées vers /api/comment
app.use('/api/comments', commentRoutes);

module.exports = app;