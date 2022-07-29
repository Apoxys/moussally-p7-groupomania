const post = require('../models/postsModel');
const user = require('../models/usersModel');
const fs = require('fs');

//Read All, One, User's posts 
exports.getAllPosts = (req, res, next) => {
    post.find().sort({ date: 'descending' })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    post.findOne({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
};

exports.getUserPosts = (req, res, next) => {
    post.find({ authorId: req.auth.userId }).sort({ date: 'descending' })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error: "user not found or unidentified" }));
};

//Create
exports.createPost = (req, res, next) => {
    const postObject = req.body
    delete postObject._id;
    const newPost = new post({
        ...postObject,
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "",
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
                if (oldPost.imageUrl) {
                    let linkImgToRemove = oldPost.imageUrl.split(`${req.protocol}://localhost:3001/`)
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
                    postObject = {
                        ...postObject,
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'publication mise à jour' }))
                        .catch(error => res.status(400).json({ error }));
                }
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
    user.findOne({ _id: req.auth.userId })
        .then(currentUser => {
            post.findOne({ _id: req.params.id })
                .then((post) => { // refactor this in switch ?
                    if (!post) {
                        return res.status(404).json({ message: 'post not found' })
                    }
                    if (post.authorId !== req.auth.userId && currentUser.isAdmin !== true) {
                        return res.status(401).json({ message: 'You cannot suppress this post!' })
                    }
                    if (!post.imageUrl) {
                        post.deleteOne({ _id: req.params.id })
                            .then(() => res.status(200).json({ message: 'Publication supprimée' }))
                            .catch(error => res.status(400).json({ message: error }));
                    } else {
                        const filename = post.imageUrl.split('/images/')[1];
                        fs.unlink(`images/${filename}`, () => {
                            post.deleteOne({ _id: req.params.id })
                                .then(() => res.status(200).json({ message: 'Publication supprimée' }))
                                .catch(error => res.status(400).json({ message: error }));
                        })
                    }
                })
                .catch(error => res.status(400).json({ message: error.Error }))

        })
        .catch(error => res.status(401).json({ error: "You dont have credentials" }))

};


//likes and dislikes
exports.likes = (req, res, next) => {

    const currentUserId = req.auth.userId
    const currentPostId = req.params.id
    user.findById(currentUserId)
        .then((currentUser) => {
            post.findById(currentPostId)
                .then((currentPost) => {

                    //check user like status
                    if (req.body.like == 1) {
                        // if users already liked, cancels the like
                        if (currentUser.userLiked.includes(currentPostId)) {
                            currentPost.likes--
                            const thisPostIndex = currentUser.userLiked.indexOf(currentPost._id)
                            currentUser.userLiked.splice(thisPostIndex, 1)
                        } else {
                            //if user disliked before, substract the dislike to like instead
                            if (currentUser.userDisliked.includes(currentPostId)) {
                                currentPost.dislikes--
                                const thisPostIndex = currentUser.userDisliked.indexOf(currentPost._id)
                                currentUser.userDisliked.splice(thisPostIndex, 1)
                            }
                            currentPost.likes++
                            currentUser.userLiked.push(currentPostId)
                        }
                    }

                    //check user dislike status
                    if (req.body.like == -1) {
                        // if users already disliked, cancels the dislike
                        if (currentUser.userDisliked.includes(currentPostId)) {
                            currentPost.dislikes--
                            const thisPostIndex = currentUser.userDisliked.indexOf(currentPost._id)
                            currentUser.userDisliked.splice(thisPostIndex, 1)

                        } else {
                            //if user liked before, substract the like to dislike instead
                            if (currentUser.userLiked.includes(currentPostId)) {
                                currentPost.likes--
                                const thisPostIndex = currentUser.userLiked.indexOf(currentPost._id)
                                currentUser.userLiked.splice(thisPostIndex, 1)
                            }
                            currentPost.dislikes++
                            currentUser.userDisliked.push(currentPostId)
                        }
                    }
                    currentPost.save()
                        .then((post) => {
                            currentUser.save()
                                .then(() => res.status(200).json({ message: 'likes et dislikes mis à jour' }))
                                .catch(() => res.status(400).json({ "error in save ": new Error }));
                        })
                        .catch(() => res.status(400).json({ "error in save ": new Error }));
                })
                .catch(error => res.status(400).json({ "error in post findOne ": error }));
        })
        .catch(error => res.status(400).json({ "error in userfindOne ": error }));
};