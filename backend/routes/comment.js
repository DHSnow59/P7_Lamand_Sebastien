//Importation d'express
const express = require('express');

//Creation du router
const router = express.Router();
//Importation Auth
const auth = require('../midlleware/auth');
//Importation des controllers user
const commentControllers = require('../controllers/comment');


//Enregistrement des Posts dans la base de données
router.post('/', auth, commentControllers.createComment);
// Suppression d'un commentaire
router.delete('/:id', auth, commentControllers.deleteComment);
//Récupération de la liste des postes 
router.get('/', auth, commentControllers.getAllComment);




//Exportation des routers
module.exports = router;