var express = require('express');
var router = express.Router();
var Goal = require("../models/goalModel");


var handler = function(res, next) {
    return function(err, response) {
        if (err) {
            return next(err);
        }
        res.json(response);
    }
}
//Get goals

router.get('/', function(req, res, next) {
    Goal.find({ user: req.user._id }, handler(res, next));
})


//add goal

router.post('/', function(req, res, next) {
    console.log(req.body)
    Goal.create(req.body, handler(res, next));
});

//delete goal

router.delete("/:goalId", function(req, res, next) {
    var goalId = req.params.goalId;
    Goal.findByIdAndRemove(goalId, handler(res, next));
})

//update goal

router.put("/:goalId", function(req, res, next) {
    var goalId = req.params.goalId;
    Goal.findByIdAndUpdate(goalId, req.body, { new: true }, handler(res, next));
})


//update importance rating(if group working wih goal)

router.post('/:goalId/importanceRating', function(req, res, next) {
    var goalId = req.params.goalId;
    var updateObject = { $push: { importanceRating: req.body.rating } }
    Goal.findByIdAndUpdate(goalId, updateObject, { new: true }, handler(res, next));
})

//add task to goal
router.post('/:goalId/tasks', function(req, res, next) {
    var goalId = req.params.goalId;
    Goal.findByIdAndUpdate(goalId, { $push: { tasks: req.body } }, { new: true }, handler(res, next))
});

//update task

router.put("/:goalId/tasks/:taskId", function(req, res, next) {
    var goalId = req.params.goalId;
    var taskId = req.params.taskId;

    Goal.findById(goalId, function(err, goal){
        for(var i=0;i<goal.tasks.length;i++){
            if(goal.tasks[i].id== taskId){
                goal.tasks[i]=req.body
            }
        }
     

    goal.save(handler(res, next))
    });
})

//delete task

router.delete('/:goalId/tasks/:taskId', function(req, res, next) {
    var goalId = req.params.goalId;
    var taskId = req.params.taskId;
    Goal.findByIdAndUpdate(goalId, { $pull: { tasks: { _id: taskId } } }, handler(res, next))
});

//refresh task

router.get('/:goalId', function(req, res, next) {
    Goal.findById(req.params.goalId, handler(res, next))
})

//change rating

router.post('/:goalId/importanceRating', function(req, res, next) {

    var updateObject = { $push: { importanceRating: req.body.importanceRating } };

    Goal.findByIdAndUpdate(req.param.goalId, updateObject, { new: true }, handler(res, next))
});





module.exports = router;