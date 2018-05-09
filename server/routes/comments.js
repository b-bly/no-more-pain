const express = require('express')
const router = express.Router()
const passport = require('../passport')
const Comment = require('../database/models/comments')

router.post('/add-reply/:injuryId', (req, res) => {

    const author = { username: req.user.username, id: req.user._id };
    req.body.author = { username: req.user.username, id: req.user._id };

    console.log('*** add reply req.body: ***');
    console.log(req.body);
    console.log('injuryId:');
    console.log(req.params.injuryId);
    const newComment = new Comment(req.body);
    console.log(newComment);
    newComment.save((err, comment) => {
        if (err) return res.json(err)
        console.log('success');
        res.json(comment)
    })

    // req.body
    // treatment_id: this.state.treatmentId,
    //         text: comment,
    //         injury_id: this.props.injuryId
})

router.put('/', (req, res) => {
    console.log('comment put, req.body: ');
    console.log(req.body);

    const id = req.body.commentId;
    const comment = {
        text: req.body.comment
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
    console.log('comment upvote put, req.query: ');
    const id = req.query.commentId; //logs undefined for some reason...
    const commentId = req.body.commentId
    console.log(commentId);
    console.log(id);
    
    Comment.findByIdAndUpdate(
        { _id: commentId },
        {
            $inc: { 'upvotes': 1 }
        },
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


module.exports = router;