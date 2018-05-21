const express = require('express')
const router = express.Router()
const passport = require('../passport')
const Comment = require('../database/models/comments')
const mongoose = require('mongoose');

router.post('/add-reply/:treatmentId', (req, res) => {
    req.body.author = { username: req.user.username, id: req.user._id };
    console.log('*** add reply req.body: ***');
    console.log(req.body);
 
    const newComment = new Comment(req.body);
    console.log(newComment);
    newComment.save((err, comment) => {
        if (err) return res.json(err)
        console.log('success');
        res.json(comment)
    });
});

router.put('/', (req, res) => {
    console.log('comment put, req.body: ');
    console.log(req.body);
    const id = req.body._id;
    const comment = {
        text: req.body.text
    }

    Comment.findByIdAndUpdate(
        { _id: id },
        { $set: comment },
        (err, data) => {
            if (err) {
                console.log('put error: ', err);
                res.sendStatus(500);
            } else {
                console.log('comments update success: ');
                console.log(data);
                res.sendStatus(200);
            }
        }
    );
});

router.put('/comment-upvote/:commentId', (req, res) => {
    console.log('comment upvote put, req.body: ');
    const commentId = req.body._id
    console.log(req.body);
    const userId = req.user._id;


    if (req.isAuthenticated()) {
        Comment.collection.findOne({
            '_id': new mongoose.Types.ObjectId(commentId),
            'upvotes': new mongoose.Types.ObjectId(userId)
        },
            (err, data) => {
                if (err) {
                    console.log('Comment upvote error: ', err)
                } else if (data) {
                    console.log('user already upvoted');
                    console.log(data);

                    res.json({
                        error: `Sorry, user already upvoted this comment`
                    })
                } else {
                    console.log('upvoting the comment ');
                    Comment.collection.updateOne({ '_id': new mongoose.Types.ObjectId(commentId) },
                        {
                            $push: { 'upvotes': userId }
                        }, (err, data) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('upvote successful');
                                Comment.collection.findOne({
                                    '_id': new mongoose.Types.ObjectId(commentId)
                                },
                                    (err, data) => {
                                        if (err) {
                                            console.log('Comment upvote error: ', err)
                                        } else {
                                            console.log('sending comment');
                                            console.log(data);
                                            res.send(data);
                                        }
                                    }
                                )
                            }
                        });
                }
            });
    } else {
        res.sendStatus(403);
    }
});

// finish
router.delete('/', (req, res) => {
    console.log('*** Delete comment ***');
    console.log('id: ');
    console.log(req.query.commentId);

    Comment.remove({ _id: req.query.commentId })
        .exec((err, data) => {
            if (err) {
                console.log('delete comment error:');
                console.log(err)
                res.send(err)
            }
            console.log('delete comment, data:');
            console.log(data);
            res.send(data);
        });
});

module.exports = router;