var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/goalistDB', function() {
    console.log("DB connection established!!!");
})

var Goal = require("./goalModel")
var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var handler = function(res, next) {
        return function(err, goal) {
            if (err) {
                return next(err);
            }
            res.send(goal);
        }
    }
    //Get goals

app.get('/goals', function(req, res, next) {
    Goal.find(handler(res, next));
})

//add goal

app.post('/goals', function(req, res, next) {
    console.log(req.body)
    Goal.create(req.body, handler(res, next));
});

//delete goal

app.delete("/goals/:goalId", function(req, res, next) {
    var goalId = req.params.goalId;
    Goal.findByIdAndRemove(goalId, handler(res, next));
})

//update goal

app.put("/goals/:goalId", function(req, res, next) {
    var goalId = req.params.goalId;
    Goal.findByIdAndUpdate(goalId, req.body, { new: true }, handler(res, next));
})


//update importance rating(if group working wih goal)

app.post('/goals/:goalId/importanceRating', function(req, res, next) {
    var goalId = req.params.goalId;
    var updateObject = { $push: { importanceRating: req.body.rating } }
    Goal.findByIdAndUpdate(goalId, updateObject, { new: true }, handler(res, next));
})

//add task to goal
app.post('/goals/:goalId/tasks', function(req, res, next) {
    var goalId = req.params.goalId;
    Goal.findByIdAndUpdate(goalId, { $push: { tasks: req.body } }, { new: true }, handler(res, next))
});

//delete task

app.delete('/goals/:goalId/tasks/taskId', function(req, res, next) {
    var goalId = req.params.goalId;
    var taskId = req.params.taskId;
    Goal.findByIdAndRemove(goalId, { $pull: { tasks: { _id: taskId } } }, { new: true }, handler(res, next))
});

//refresh task

app.get('/goals/:goalId', function(req, res, next) {
    Goal.findById(req.params.goalId, handler(res, next))
})

//change rating

app.post('/goals/:goalId/importanceRating', function(req, res, next) {

    var updateObject = { $push: { importanceRating: req.body.importanceRating } };

    Goal.findByIdAndUpdate(req.param.goalId, updateObject, { new: true }, handler(res, next))
});


// error handler to catch 404 and forward to main error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});
app.listen(8000, function() {
    console.log("yo yo yo, on 8000!!")
});
