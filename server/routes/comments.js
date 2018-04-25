const express = require('express')
const router = express.Router()
const passport = require('../passport')
const Comment = require('../database/models/comments')

router.post('/add-reply/:injuryId', (req, res) => {
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

    // const commentsSchema = {
    //     injury_id: Schema.Types.ObjectId,
    //     treatment_id: Schema.Types.ObjectId,
    //     parent_id: Schema.Types.ObjectId,
    //     posted: { type: Date, default: Date.now },
    //     upvotes: Number,
    //     author: {
    //               id: Schema.Types.ObjectId,
    //               username: String
    //              },
    //     text: String
    // }

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

module.exports = router;