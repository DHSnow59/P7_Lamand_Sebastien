//Importation d'express
const express = require('express');
//Importation AUTH
const auth = require('../midlleware/auth');

//Creation du router
const router = express.Router();
//Importation des controllers user
const userControllers = require('../controllers/user');


//Routeur pour la création d'utilisateur
router.post('/signup', userControllers.signup);


//Router pour l'identification d'utilisateur
router.post('/login', userControllers.login);

router.get('/', auth, userControllers.getAllUser);

router.delete('/:id', auth, userControllers.deleteUserById);

//Exportation des routers
module.exports = router;