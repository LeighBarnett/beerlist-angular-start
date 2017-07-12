var express = require('express')
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var goalRoutes = require('./routes/goalRoutes');
var userRoutes = require('./routes/userRoutes');
var User = require('./models/userModel')

mongoose.connect('mongodb://localhost/goalistDB', function() {
    console.log("DB connection established!!!");
})

var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(expressSession({
    secret: 'yourSecretHere',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());


app.use('/goals', goalRoutes);
app.use('/users', userRoutes);



//this below route will make sure index.html is served
//for any unhandled routes
app.all('[^.]+', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
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

app.all('*', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
})

app.listen(8000, function() {
    console.log("yo yo yo, on 8000!!")
});
