const express = require('express')
const router = express.Router()
const passport = require('../passport')
const Injury = require('../database/models/injury')
const Comment = require('../database/models/comments')
const mongoose = require('mongoose');

router.post('/', (req, res, next) => {
    console.log('*** add injury ***');
    const title = req.body.title;
    const description = req.body.description;
    const author = { username: req.user.username, id: req.user._id };
    const injury = {
        title: title,
        description: description,
        author: author
    };
    if (req.isAuthenticated()) { //need to be logged in
        Injury.findOne({ title: title }, (err, title) => {
            if (err) {
                console.log('User.js post error: ', err)
            } else if (title) {
                res.json({
                    error: `Sorry, already an injury called, \"${title}\"`
                })
            }
            else {
                console.log('adding new injury, newInjury: ');

                const newInjury = new Injury(injury);
                //this didn't work:
                //const newInjury = new Injury ({
                //title: title,
                //description: description
                // })          
                console.log(newInjury);
                newInjury.save((err, injurySaved) => {
                    if (err) {
                        return res.json(err)
                    } else {
                        console.log('success');
                        res.json(injurySaved)
                    }
                })
            }
        })
    } else {
        res.sendStatus(403); //forbidden
    }
})

router.get('/', (req, res) => {
    Injury.find({})
        .exec((err, data) => {
            console.log('get injury list, data:');
            console.log(data);

            res.send(data);
        });
});

router.get('/info', (req, res) => {
    const id = req.query.id;
    Injury.findOne({ _id: id })
        .lean() //returns plain json, not a model instance
        .exec((err, injuryObject) => {
            if (err) {
                console.log('get info error:');
                console.log(err);
                res.send(err)
            } else {
                //get comments
                Comment.find({ injury_id: id })
                    .lean()
                    .exec((err, comments) => {
                        if (err) {
                            console.log('get info error:');
                            console.log(err);
                            res.send(err)
                        } else {
                            console.log('get comments: ');
                            //add comments to injury object

                            injuryObject.treatments = injuryObject.treatments.map((treatment, i) => {
                                let treatmentCopy = Object.assign({}, treatment);
                                treatmentCopy.comments = [];
                                //treatment.comments = [];
                                comments.forEach((comment, j) => {
                                    //lesson learned.  need to change mongoose ids to strings or the == logic doesn't work
                                    const match = comment.treatment_id.toString() == treatment._id.toString();
                                    if (match == true) {
                                        treatmentCopy.comments.push(comment);
                                        // console.log('treatment: ');
                                        // console.log(treatmentCopy.comments);
                                    }
                                });
                                return treatmentCopy;
                            })
                            console.log('injuryObject');
                            console.log(injuryObject);

                            //send injury object with comments
                            res.send(injuryObject)
                        }
                    });
            }
        });
});

router.put('/update', function (req, res) {
    const injury = {
        title: req.body.title,
        description: req.body.description
    };
    const id = req.body._id;
    console.log('update, req.body: ');
    console.log(req.body);

    if (req.isAuthenticated()) {
        if (req.user._id.toString() === req.body.author.id.toString()) {
            console.log('ids match');
            Injury.findByIdAndUpdate(
                { _id: id },
                { $set: injury },
                (err, data) => {
                    if (err) {
                        console.log('put error: ', err);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                }
            );
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(403);
    }
});

router.delete('/', (req, res) => {
    const userId = req.user._id.toString();
    const authorId = req.query.authorId.toString();
    const id = req.query.injuryId;

    if (req.isAuthenticated() &&
        userId === authorId) {
        Injury.remove({ _id: id })
            .exec((err, data) => {
                if (err) {
                    console.log('delete injury error:');
                    console.log(err)
                    res.send(err)
                }
                console.log('get injury info, data:');
                console.log(data);
                res.send(data);
            });
    }
});

// Treatments
router.post('/add-treatment/:injuryId', (req, res) => {
    console.log('*** add treatment ***');
    console.log(req.body);
    console.log('injuryId:');
    console.log(req.params.injuryId);

    const treatment = req.body;
    treatment.author = {};
    treatment.author.id = req.user._id;
    treatment.author.username = req.user.username;
    const injuryId = req.params.injuryId;


    console.log('treatment: ');
    console.log(treatment);

    // updating an array of objects: 
    //https://stackoverflow.com/questions/19695058/how-to-define-object-in-array-in-mongoose-schema-correctly-with-2d-geo-index

    //update wasn't working.  Find out why
    //because you need to find the record first?
    // https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose2
    if (req.isAuthenticated()) { //need to be logged in
        //add statement that author.id === req.user._id ?  To make sure the user info sent matches?

        Injury.findOneAndUpdate({ _id: injuryId },
            { $push: { treatments: treatment } },
            { new: true }) //returns the new, updated document in 'data' below when true
            .exec((err, data) => {
                if (err) {
                    console.log('post treatment error:');
                    console.log(err)
                    res.send(err)
                }
                console.log('post treatment, data:');
                console.log(data);

                // Injury.find({'treatments._id': new mongoose.Types.ObjectId(treatmentId) })
                // .exec((err, data) => {
                //     console.log('get injury list, data:');
                //     console.log(data);


                // });
                res.send(data);
            });
    } else {
        res.sendStatus(403);
    }
});

//Delete treatment
router.put('/info', (req, res) => {
    //https://docs.mongodb.com/manual/reference/operator/update/pull/
    //https://github.com/Automattic/mongoose/issues/542 

    //console.log(req.body);

    if (req.isAuthenticated() &&
        req.user._id.toString() === req.body.authorId.toString()) {
        Injury.collection.update({ _id: new mongoose.Types.ObjectId(req.body.injuryId) },
            { $pull: { 'treatments': { _id: new mongoose.Types.ObjectId(req.body.treatmentId) } } },
            (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('treatment update successful');
                    console.log(data.result);
                    console.log(req.body.treatmentId);
                    res.send(data);
                }
            });
    }
});


router.put('/edit-treatment', (req, res) => {
    console.log('info put, req.body: ');
    //const injuryId = req.params.injuryId;
    const name = req.body.name;
    const description = req.body.description;
    const treatmentId = req.body._id;
    const userId = req.user._id.toString();
    const authorId = req.body.author.id.toString();
    console.log(req.body);
    // console.log(req.params.injuryId); works, but should probably be attached in params object
    //in edit-treatment.js, not concatenated to the url

    //https://docs.mongodb.com/manual/reference/operator/update/positional/
    // https://stackoverflow.com/questions/15691224/mongoose-update-values-in-array-of-objects/15691950

    // Person.update({'items.id': 2}, {'$set': {
    //     'items.$.name': 'updated item2',
    //     'items.$.value': 'two updated'
    // }}, function(err) { ...

    if (req.isAuthenticated() &&
        userId === authorId) {
        Injury.collection.updateOne({ 'treatments._id': new mongoose.Types.ObjectId(treatmentId) },
            {
                $set:
                {
                    'treatments.$.name': name,
                    'treatments.$.description': description
                }
            }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('treatment update successful');
                    console.log(data.result);
                    console.log(req.body.treatmentId);
                    res.send(data);
                }
            });
    }
});
//should move this to comments module?

router.put('/treatment-upvote:injuryId', (req, res) => {
    console.log('treatment-upvote put, req.body: ');
    const treatmentId = req.body.treatmentId;
    const injuryId = req.params.injuryId;
    const userId = req.user._id;
    console.log(req.body);
    console.log(injuryId);
    console.log(req.user);

    // 'treatments._id' : new mongoose.Types.ObjectId(treatmentId),
    // 'treatments.upvotes': new mongoose.Types.ObjectId(userId)
    if (req.isAuthenticated()) {
        Injury.collection.findOne({
            'treatments': {
                $elemMatch: {
                    '_id': new mongoose.Types.ObjectId(treatmentId),
                    'upvotes': new mongoose.Types.ObjectId(userId)
                }
            }

        }, (err, data) => {
            if (err) {
                console.log('Treatment upvote error: ', err)
            } else if (data) {
                console.log(data);

                console.log('This user already upvoted the treatment');

                res.json({
                    error: `Sorry, user already upvoted this treatment`
                })
            }
            else {
                console.log('upvoted the treatment ');
                Injury.collection.updateOne({ 'treatments._id': new mongoose.Types.ObjectId(treatmentId) },
                    {
                        $push: { 'treatments.$.upvotes': userId }
                    }, (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('upvote successful');
                            console.log(data);

                            res.send(data);
                        }
                    });

            }
        });
    } else {
        res.sendStatus(403);
    }
});


module.exports = router;