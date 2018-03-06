const express = require('express')
const router = express.Router()
const passport = require('../passport')
const Injury = require('../database/models/injury')
const Comments = require('../database/models/comments')

router.post('/', (req, res) => {
    console.log('*** add injury ***');
    console.log(req.body);

    const title = req.body.title;
    const description = req.body.description;


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

            const newInjury = new Injury(req.body);
            //this didn't work:
            //const newInjury = new Injury ({
            //title: title,
            //description: description
            // })          
            console.log(newInjury);
            newInjury.save((err, injury) => {
                if (err) return res.json(err)
                console.log('success');

                res.json(injury)
            })
        }
    })
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
        .exec((err, data) => {
            if (err) {
                console.log('get info error:');
                console.log(err);
                res.send(err)
            }

            res.send(data)
        });
});

router.put('/update', function (req, res) {
    const injury = {
        title: req.body.title,
        description: req.body.description
    };
    const id = req.body.id;
    console.log('update, req.body: ');
    console.log(req.body);
    Injury.findByIdAndUpdate(
        { _id: id },
        { $set: injury },
        function (err, data) {
            if (err) {
                console.log('put error: ', err);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});

router.delete('/', (req, res) => {
    const id = req.query.id;
    console.log('delete injury, req.query:');
    console.log(req.query);

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
});

// Treatments
router.post('/add-treatment/:injuryId', (req, res) => {
    console.log('*** add treatment ***');
    console.log(req.body);
    console.log('injuryId:');
    console.log(req.params.injuryId);

    const treatment = req.body;
    const injuryId = req.params.injuryId;
    treatment.upvotes = 0;
    console.log('treatment: ');
    console.log(treatment);

    // updating an array of objects: 
    //https://stackoverflow.com/questions/19695058/how-to-define-object-in-array-in-mongoose-schema-correctly-with-2d-geo-index

    //update wasn't working.  Find out why
    //because you need to find the record first?
    // https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose2
    Injury.findOneAndUpdate({ _id: injuryId },
        { $push: { treatments: treatment } })
        .exec((err, data) => {
            if (err) {
                console.log('post treatment error:');
                console.log(err)
                res.send(err)
            }
            console.log('post treatment, data:');
            console.log(data);
            res.send(data);
        });
})

// injuryId: this.props.injuryInfo._id,
//             treatmentId: treatmentId,
//             comment: comment
router.post('/add-reply/:injuryId', (req, res) => {
    console.log('*** add reply req.body: ***');
    console.log(req.body);
    console.log('injuryId:');
    console.log(req.params.injuryId);

    const injuryId = req.params.injuryId;
    const treatmentId = req.body.treatmentId;
    const comment = req.body.comment;


    // updating an array of objects: 
    //https://stackoverflow.com/questions/19695058/how-to-define-object-in-array-in-mongoose-schema-correctly-with-2d-geo-index

    //update wasn't working.  Find out why
    // https://stackoverflow.com/questions/15691224/mongoose-update-values-in-array-of-objects
    
    // Injury.findOneAndUpdate({ _id: injuryId },
    //     { $push: { treatments: treatment } })
    //     .exec((err, data) => {
    //         if (err) {
    //             console.log('post treatment error:');
    //             console.log(err)
    //             res.send(err)
    //         }
    //         console.log('post treatment, data:');
    //         console.log(data);
    //         res.send(data);
    //     });
})
//example
// Person.update({ 'items.id': 2 }, {
//     '$set': {
//         'items.$.name': 'updated item2',
//         'items.$.value': 'two updated'
//     }
// }, function (err) { ...

// check if logged in (authenticated)
function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.send({ redirect: 'login' })
    }
}

module.exports = router