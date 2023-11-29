//Create web server
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const { ensureAuthenticated } = require('../config/auth');

// Add comment to a post
router.post('/add/:id', ensureAuthenticated, (req, res) => {
    const newComment = new Comment({
        text: req.body.text,
        user: req.user.id
    });
    newComment.save()
        .then(comment => {
            Post.findOne({ _id: req.params.id })
                .then(post => {
                    post.comments.push(comment._id);
                    post.save()
                        .then(post => {
                            res.redirect(`/posts/${req.params.id}`);
                        });
                });
        });
});

// Delete comment
router.delete('/:id', ensureAuthenticated, (req, res) => {
    Comment.findOneAndDelete({ _id: req.params.id })
        .then(comment => {
            Post.findOne({ comments: req.params.id })
                .then(post => {
                    post.comments.remove(req.params.id);
                    post.save()
                        .then(post => {
                            res.redirect(`/posts/${post._id}`);
                        });
                });
        });
});

// Edit comment
router.put('/:id', ensureAuthenticated, (req, res) => {
    Comment.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(comment => {
            res.redirect(`/posts/${comment.post}`);
        });
});

// Like comment
router.post('/:id/like', ensureAuthenticated, (req, res) => {
    Comment.findOne({ _id: req.params.id })
        .then(comment => {
            comment.likes.push(req.user.id);
            comment.save()
                .then(comment => {
                    res.redirect(`/posts/${comment.post}`);
                });
        });
});

// Dislike comment
router.post('/:id/dislike', ensureAuthenticated, (req, res) => {
    Comment.findOne({ _id: req.params.id })
        .then(comment => {
            comment.likes.remove(req.user.id);
            comment.save()
                .then(comment => {
                    res.redirect(`/posts/${comment.post}`);
                });
        });
});

module.exports = router;