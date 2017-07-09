var mongoose = require("mongoose");

var Schema = mongoose.Schema

var taskSchema = new Schema({
    name: { type: String },
    deadline: { type: String },
    importance: { type: String },
    urgency: { type: String },
    percentageCompleted: { type: Number },
    date: Date,
    comment: { type: String }
})

var goalSchema = new Schema({
    name: { type: String },
    deadline: { type: String },
    category: { type: String },
    image_url: { type: String },
    importance: { type: String },
    urgency: { type: String },
    importanceRating: [Number],
    urgencyRating: [Number],
    percentageCompleted: { type: Number },
    date: Date,
    tasks: [taskSchema]
})
var Goal = mongoose.model('goal', goalSchema)




module.exports = Goal;
