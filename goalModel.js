var mongoose= require("mongoose");

var Schema=mongoose.Schema

var goalSchema = new Schema({
    name:{type: String},
    deadline: {type: String},
    category: {type: String},
    image_url: {type: String},
    importance:{type: String},
    urgency:{type: String},
    importanceRating: [Number],
    urgencyRating: [Number],
    percentageCompleted:{type: Number},
    date: Date
})
var Goal=mongoose.model('goal',goalSchema)

var newGoal= new Goal({
  name:  "Finish this project",
  deadline: "8 July 2017",
  category: "Studies"
})

// newGoal.save();

module.exports=Goal;