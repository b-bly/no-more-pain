const express = require('express')
const router = express.Router()
const passport = require('../passport')
const Injury = require('../database/models/injury')

router.post('/', loggedIn, (req, res) => {
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
    console.log('get info, req.query:');
    console.log(req.query);
    
    Injury.findOne({_id: id})
        .exec((err, data) => {
            console.log('get injury info, data:');
            console.log(data);
            res.send(data);
        });
});


// check if logged in (authenticated)
function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.send({ redirect: 'login' })
    }
}

module.exports = router