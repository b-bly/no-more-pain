const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define injurySchema
const injuriesSchema = new Schema({

	title: { type: String, unique: false, required: true },
    description: { type: String, unique: false, required: false },
    treatments: [{
        //add id
        id: Schema.Types.ObjectId,
        name: String,
        // comments: [String], //needs to be it's own schema?
        description: String,
        upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        author: {
            id: { type: Schema.Types.ObjectId, ref: 'User' },
            username: String
           },
        image: String,
    }],
    author: {
        id: { type: Schema.Types.ObjectId, ref: 'User' },
        username: String
       }
},
{
    collection: 'injuries'
})

//https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/
// Populate function of mongoose for joining user doc to author.

//embeding comments in this injuriesSchema will only let me display comments
//as they are structured in the schema.
// Pro: no data processing
// con: less flexibility
//I think I'm going to try a separate comments schema.

//MONGO comments schema:
//https://docs.mongodb.com/ecosystem/use-cases/storing-comments/#sharding

//slug generator for Mongoose
//https://www.npmjs.com/package/mongoose-slug-generator

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