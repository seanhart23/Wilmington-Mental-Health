var express        = require('express'),
    request        = require("express"),
    router         = express.Router(),
    User           = require('./models/user'),
    middleware     = require('./middleware'),
    passport       = require('passport'),
    bodyParser       = require('body-parser'),
    LocalStrategy  = require('passport-local'),
    mongoose       = require('mongoose'),
    methodOverride   = require('method-override'),
    app            = express(),
    request        = require('request');


// mongoose.connect('mongodb://seanhart:password1@ds127802.mlab.com:27802/absideon');

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret: 'I am cool',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});
// CREATE ROUTES
var indexRoutes = require('./routes/index');

//REQUIRING ROUTE FILES USING EXPRESS ROUTER
app.use('/', indexRoutes);

//TELL APP TO LISTEN TO PORT AND IP
app.listen(process.env.PORT || 3000, process.env.IP, function(){
// app.listen(process.env.PORT, process.env.IP, function(){
// app.listen(3000, process.env.IP, function(){
    console.log("================================");
    console.log("The WMH server has started!");
    console.log("================================");
});