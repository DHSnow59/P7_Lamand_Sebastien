// Importation jwt
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config({ encoding: "latin1" });


module.exports = (req, res, next) => {
    // De nombreux problèmes peuvent se produire, nous insérons tout à l'intérieur d'un bloc try...catch ;
    try {
        //Nous extrayons le token du header Authorization de la requête entrante
        //Nous utilisons donc la fonction split pour récupérer tout après l'espace dans le header
        const token = req.headers.authorization;
        // Nous utilisons ensuite la fonction verify pour décoder notre token. Si celui-ci n'est pas valide, une erreur sera générée ;
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        // Nous extrayons l'ID utilisateur de notre token 
        const userId = decodedToken.userId;
        req.auth = { userId };
        next();
    } catch (error) {
        res.status(401).json({ error: error | 'Requete non authentifiée !' });
    }
};