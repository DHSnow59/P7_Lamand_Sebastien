const Post = require('../models/post');
const fs = require('fs');
const comment = require('../models/comment');


// Création d'un nouveau commentaire
exports.createComment = (req, res, next) => {
    const commentObject = JSON.parse(req.body.post);
    delete commentObject._id;
    const comment = new Comment({
        ...commentObject,
    });
    comment.save()
        .then(() => res.status(201).json({ message: 'Commentaire enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

//Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
    Comment.findOne({ _id: req.params.id })
        .then(comment => {
            Post.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//Récupération de la liste des commentaires
exports.getAllComment = (req, res, next) => {
    Comment.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};