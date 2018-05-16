
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define commentsSchema
const commentsSchema = new Schema({
    injury_id: Schema.Types.ObjectId,
    treatment_id: Schema.Types.ObjectId,
    parent_id: Schema.Types.ObjectId,
    posted: { type: Date, default: Date.now },
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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

