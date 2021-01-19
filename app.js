var express        = require('express'),
    request        = require("express"),
    router         = express.Router(),
    User           = require('./models/user'),
    middleware     = require('./middleware'),
    passport       = require('passport'),
    bodyParser     = require('body-parser'),
    LocalStrategy  = require('passport-local'),
    mongoose       = require('mongoose'),
    methodOverride = require('method-override'),
    app            = express(),
    nodemailer     = require('nodemailer'),
    cookieParser   = require('cookie-parser'),
    mysql          = require('mysql');
    request        = require('request');
    Stripe         = require('stripe');
    stripe         = Stripe('sk_test_51HJTkuEu13t8IjdAxry9AszPenQzzctiEHgiCBZzohftSbZkA42CnUHON1U5ztaffAQ5HmgA0eMb9uS1YWNS2xt300KGi4cZpK');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Maem250123!",
//   database: 'blog_post'
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Database Connected!");
// });

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(express.json());

app.use(require("express-session")({
    secret: 'I am cool',
    resave: false,
    saveUninitialized: false
}));
app.use(cookieParser());

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

/*** Mailer ***/
app.post('/contact', (req, res) => {
  const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'wilmingtonmentalhealth@gmail.com',
      pass: 'kwwcpuxcczmtofyw'
    }
  })
  const mailOpts = {
    from: 'Wilmington Mental Health Website', 
    to: 'info@wmhwc.com',
    // to: 'seanhart23@gmail.com',
    subject: 'New message from Wilmington Mental Health Website',
    text: `${req.body.Name} (${req.body.Email}) has sent you the following message:
    Contact Number: ${req.body.Number}
    Time Preference: ${req.body.Time}
    Provider Preference: ${req.body.Provider}
    Message: ${req.body.Message}
    How did you hear about us? ${req.body.Hear}`
  }

  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      res.render('index') 
    }
    else {
      res.render('index')
    }
  })
})

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