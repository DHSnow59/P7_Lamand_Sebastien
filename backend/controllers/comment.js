const db = require('../models');
const Comment = db.comment;

// Création d'un nouveau commentaire
exports.createComment = (req, res, next) => {
    const comment = {
        postId: req.body.post_id,
        ...req.body,
    }
    Comment.create(comment)
        .then(() => res.status(201).json({ message: 'Commentaire enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

//Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
    Comment.destroy({ where: { id: req.params.id } })
        .then(comment => {
            res.send({ message: "commentaire supprimé" });
        })
        .catch(error => res.status(500).json({ error }));
};

//Récupération de la liste des commentaires
exports.getAllComment = (req, res, next) => {
    Comment.findAll()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};