const db = require('../models');
const Post = db.post;
const Comment = db.comment;
const fs = require('fs');

// Création d'un nouveau post
exports.createPost = (req, res) => {
    const post = {
        userId: req.body.userId,
        titre: req.body.title,
        auteur: req.body.creator,
        user_id: req.body.userId,
        contenu: req.body.content,
        image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    };
    // Sauvegarde du post dans la base de donnée //
    Post.create(post)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Erreur lors de la suppréssion du post.",
            });
        });
};

//Suppression d'un post
exports.deletePost = (req, res, next) => {
    const id = req.params.id
    Post.findByPk(id)
        .then((post) => {
            const filename = post.image_url.split('/images/')[1];
            console.log(filename)
            fs.unlink(`images/${filename}`, () => {
                Post.destroy({ where: { id: req.params.id } })
                    .then(post => {
                        res.send({ message: "poste supprimé" });
                    })
                    .catch(error => res.status(500).json({ error }));
            });
        })
        .catch((err) => {
            res.status(500).send({ err });
        });
};

//Récupération de la liste des postes
exports.getAllPost = (req, res, next) => {
    Post.findAll({ include: Comment })
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};