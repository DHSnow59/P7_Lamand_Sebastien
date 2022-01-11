//Importation d'express
const express = require('express');
//Creation du router
const router = express.Router();
//Impoortation Multer
const multer = require('../midlleware/multer-config');
//Importation Auth
const auth = require('../midlleware/auth');
//Importation des controllers user
const postControllers = require('../controllers/post');


//Enregistrement des Posts dans la base de données
router.post('/', auth, multer, postControllers.createPost);
// Suppression d'un post
router.delete('/:id', auth, postControllers.deletePost);
//Récupération d'un post spécifique
router.get('/:id', auth, postControllers.getOnePost);
//Récupération de la liste des postes 
router.get('/', auth, postControllers.getAllPost);







//Exportation des routers
module.exports = router;