const Post = require('../models/post');
const fs = require('fs');
const post = require('../models/post');

// Création d'un nouveau post
exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    delete postObject._id;
    const post = new Post({
        ...postObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        // On initialise les likes/dislikes et les tableaux likes/dislikes a 0  
        /*likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []*/
    });
    post.save()
        .then(() => res.status(201).json({ message: 'Poste enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

//Suppression d'un post
exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Poste supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

//Modification des postes existant
exports.modifyPost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (req.file) {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    const postObject = req.file ? {
                        ...JSON.parse(req.body.post),
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    } : {...req.body };
                    Post.updateOne({ _id: req.params.id }, {...postObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Poste modifié !' }))
                        .catch(error => res.status(400).json({ error }));
                });
            } else {
                const postObject = req.body;
                Post.updateOne({ _id: req.params.id }, {...postObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Poste modifié !' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));

};

//Récupération d'un post dans la base de donnée
exports.getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};

//Récupération de la liste des postes
exports.getAllPost = (req, res, next) => {
    Post.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};