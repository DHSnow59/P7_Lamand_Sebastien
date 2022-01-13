// importation du model User
const db = require("../models");
const User = db.user;
// importation du model bcrypt
const bcrypt = require("bcryptjs");
// importation du model jsonwebtoken
const jwt = require("jsonwebtoken");
const user = require("../models/user");


// fonction pour enregistrement de nouveau utilisateur
exports.signup = (req, res, next) => {
    User.create({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        })
        .then((user) => {
            res.send({ message: "User was registered successfully!" });
        })
        .catch((err) => {
            res.status(500).send({ message: err.message });
        });
};

// fonction login pour connecter les utilisateurs existant
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id },
                            'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Récupération de la liste des Users 
exports.getAllUser = (req, res, next) => {
    User.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};

//Suppression de l'utilisateur par son ID
exports.deleteUserById = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            User.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};