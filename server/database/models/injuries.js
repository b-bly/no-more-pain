const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define userSchema
const injuriesSchema = new Schema({

	title: { type: String, unique: false, required: true },
    description: { type: String, unique: false, required: false },
    treatements: {
        name: String,
        comments: [String],
        description: String,
        upvotes: Number
    }

},
{
    collection: 'injuries'
})

const Injuries = mongoose.model('Injuries', injuriesSchema)
module.exports = Injuries
    //      Data example
    //     {
    //     id: 1,
    //     title: 'High Hamstring Tendonopathy',
    //     description: 'Pain in the butt.',
    //     treatments: 
    //      { name: 'squats',
    //        comments: [Object],
    //        description: 'Do two sets of 20',
    //        upvotes: '0' } } ]