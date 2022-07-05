const post = require('../models/postsModel');
const fs = require('fs');

//Read All and Read One 
exports.getAllPosts = (req, res, next) => {
    post.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    post.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
};

//Create
exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post)
    delete postObject._id;
    const newPost = new post({
        ...postObject,
        imageUrl: imageUrl ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : " ",
        likes: 0,
        dislikes: 0
    });
    newPost.save()
        .then(() => res.status(201).json({ message: 'Publication enregistrée!' }))
        .catch(error => res.status(400).json({ error }));
};

//Update
exports.modifyPost = (req, res, next) => {
    let postObject = req.body
    post.findOne({ _id: req.params.id })
        .then(oldPost => {
            if (req.file) {
                let linkImgToRemove = oldPost.imageUrl.split(`${req.protocol}://${correctURL}`)
                fs.unlink('./' + linkImgToRemove[1], (error) => {
                    if (error) {
                        console.log(error)
                    }
                    postObject = {
                        ...postObject,
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'publication mise à jour' }))
                        .catch(error => res.status(400).json({ error }));
                })
            } else {
                post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'publication mise à jour' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
};

//Delete
exports.deletePost = (req, res, next) => {
    post.findOne({ _id: req.params.id })
        .then((post) => {
            if (!post) {
                return res.status(404).json({ message: 'post not found' })
            }
            if (post.author !== req.auth.userId && user.isAdmin !== true) {
                return res.status(401).json({ message: 'You cannot suppress this post!' })
            }
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée' }))
                    .catch(error => res.status(400).json({ error }));
            })
        })
        .catch(error => res.status(400).json({ error }));
};

exports.likes = (req, res, next) => {
    post.findOne({ _id: req.params.id })
        .then((post) => {
            //mise à jour du status like ou dislike
            if (req.body.like == 1) {
                post.likes++
                // sauce.usersLiked.push(req.body.userId)
            }
            else if (req.body.like == -1) {
                post.dislikes++
                // sauce.usersDisliked.push(req.body.userId)
            }
            else if (req.body.like == 0) {
                // if (sauce.usersLiked.includes(req.body.userId)) {
                //     const thisUserIndex = sauce.usersLiked.indexOf(req.body.userId)
                //     sauce.usersLiked.splice(thisUserIndex, 1)
                // }
                // if (sauce.usersDisliked.includes(req.body.userId)) {
                //     const thisUserIndex = sauce.usersDisliked.indexOf(req.body.userId)
                //     sauce.usersDisliked.splice(thisUserIndex, 1)
                // }
                // logic to check is this post id is in liked array of user
            }
            // sauce.likes = sauce.usersLiked.length
            // sauce.dislikes = sauce.usersDisliked.length
            // sauce.save()
            //     .then((sauce) => res.status(200).json({ message: 'likes et dislikes mis à jour' }))
            //     .catch(() => res.status(400).json({ error: new Error }));
        })
        .catch(error => res.status(400).json({ error }));
};