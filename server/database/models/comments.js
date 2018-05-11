
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define userSchema
const commentsSchema = new Schema({
    injury_id: Schema.Types.ObjectId,
    treatment_id: Schema.Types.ObjectId,
    parent_id: Schema.Types.ObjectId,
    posted: { type: Date, default: Date.now },
    upvotes: Number,
    author: {
              id: { type: Schema.Types.ObjectId, ref: 'User' },
              username: String
             },
    text: String
},
{
    collection: 'comments'
})

const Comments = mongoose.model('Comments', commentsSchema)
module.exports = Comments;

