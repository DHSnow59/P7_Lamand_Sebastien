// importation du model User
const User = require('../models/user');
// importation du model bcrypt
const bcrypt = require("bcryptjs");
// importation du model jsonwebtoken
const jwt = require("jsonwebtoken");


// fonction pour enregistrement de nouveau utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            email: req.body.email,
            password: hash,
        });
        user
            .save()
            .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
            .catch(() =>
                res.status(400).json({
                    message: "Un utilisateur existe déjà avec cette adresse e-mail",
                })
            );
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

exports.getAllUser = (req, res, next) => {

};

exports.deleteUserById = (req, res, next) => {

};