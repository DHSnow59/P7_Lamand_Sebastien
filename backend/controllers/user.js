// importation du model User
const db = require("../models");
const User = db.user;
// importation du model bcrypt
const bcrypt = require("bcryptjs");
// importation du model jsonwebtoken
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config({ encoding: "latin1" });
const Joi = require("joi");


// fonction pour enregistrement de nouveau utilisateur
exports.signup = (req, res, next) => {
    // Ici on vérifie le formatage  des données utilisateurs 
    const schema = Joi.object().keys({
        username: Joi.string().min(2).required(),
        email: Joi.string().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/).required(),
        password: Joi.string().min(6).required(),
    })
    if (schema.validate(req.body).error) {
        res.send(schema.validate(req.body).error)
    } else {
        User.create({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
            })
            .then(() => {
                res.send({ message: "Utilisateur enregistré!" });
            })
            .catch((err) => {
                res.status(500).send({ message: err.message });
            });
    }
};

// fonction login pour connecter les utilisateurs existant
exports.login = (req, res, next) => {
    User.findOne({
            where: {
                username: req.body.username,
            },
        })
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
                        user: user,
                        accessToken: jwt.sign({ userId: user._id },
                            process.env.SECRET_KEY, { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Récupération de la liste des Users 
exports.getAllUser = (req, res, next) => {
    User.findAll()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};

//Suppression de l'utilisateur par son ID
exports.deleteUserById = (req, res, next) => {
    console.log(req.params.id)
    User.destroy({
            where: { id: req.params.id },
        })
        .then(() => {
            res.status(200).json({ message: 'Utilisateur supprimé !' })
        })
        .catch(error => res.status(400).json({ error }));
};