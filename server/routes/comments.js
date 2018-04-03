const express = require('express')
const router = express.Router()
const passport = require('../passport')
const Comment = require('../database/models/comments')

router.put('/', (req, res) => {

    const id = req.body.id;
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