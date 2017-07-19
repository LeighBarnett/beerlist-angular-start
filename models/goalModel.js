var mongoose = require("mongoose");

var Schema = mongoose.Schema

var taskSchema = new Schema({
    name: { type: String },
    deadline: Date,
    priority: { type: String },
    urgency: { type: String },
    percentageCompleted: { type: Number },
    date: Date,
    comment: { type: String },
    complete: { type: Boolean }

})

var goalSchema = new Schema({
    name: { type: String },
    deadline: Date,
    category: { type: String },
    complete: { type: Boolean },
    image_url: { type: String },
    priority: { type: String },
    urgency: { type: String },
    importanceRating: [Number],
    urgencyRating: [Number],
    percentageCompleted: { type: Number },
    date: Date,
    tasks: [taskSchema],
    user: { type: Schema.Types.ObjectId, ref: 'user' }
})
var Goal = mongoose.model('goal', goalSchema)




module.exports = Goal;