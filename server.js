var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/goalistDB', function () {
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
//Get goals

app.get('/goals', function (req, res, next) {
  Goal.find(function (err, data) {
    if (err) {
      return next(err);
    } else {
      res.send(data);
    }
  })
})

//add goal

app.post('/goals', function (req, res, next) {
  Goal.create(req.body, function (err, data) {
    if (err) {
      return next(err);
    } else {
      res.send(data);
    }
  })
});

//delete goal

app.delete("/goals/:goalId",function(req,res,next){
  var goalId = req.params.goalId;
  Goal.findByIdAndRemove(goalId, function(err,data){
    if (err) {
      return next(err);
    } else {
      res.send(data);
    }
  })
})
//update goal

app.put("/goals/:goalId",function(req,res,next){
  var goalId=req.params.goalId;
  Goal.findByIdAndUpdate(req.body, {new:true}, function(err,data){
       if (err) {
      return next(err);
    } else {
      res.send(data);
    }
  })
})

//update importance rating(if group working wih goal)

app.post('/goals/:goalId/importanceRating',function(req,res,next){
  var goalId= req.params.goalId;
  var updateObject={ $push: { importanceRating: req.body.rating } }
  Goal.findByIdAndUpdate(goalId, updateObject, {new:true}, function(err,data){
    if (err) {
      return next(err);
    } else {
      res.send(data);
    }
  })
})

//






// error handler to catch 404 and forward to main error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});
app.listen(8000, function () {
  console.log("yo yo yo, on 8000!!")
});