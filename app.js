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
    multer = require('multer'),
    mysql          = require('mysql');
    request        = require('request');
    Stripe         = require('stripe');
    stripe         = Stripe('sk_live_ZPkYqgjglvANPBbH7KB0xq6Y');

app.use(cookieParser());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/cv/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const uploadStorage = multer({ storage: storage })

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



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.json());
// app.use(express.static(__dirname + "/httpdocs/public"));
app.use(express.static(__dirname + "/public"));

//REQUIRING ROUTE FILES USING EXPRESS ROUTER
app.use('/', indexRoutes);

/*** Mailer ***/
app.post('/apply', uploadStorage.single('cv'), (req, res) => {
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
        to: `${req.body.to}`,
        // to: 'seanhart23@gmail.com',
        subject: 'New application from your website',
        html: `<h1>${req.body.Title} </h1>
               <hr><br>
               <ul>
               <li>Applicant Name: ${req.body.Name}  </li>
               <li>Email Address: ${req.body.Email}  </li>
               <li>Contact Number: ${req.body.Number}  </li>
               <li>License: ${req.body.License}  </li>
               <li>Specialties: ${req.body.Specialties}  </li>
               <li>Message: ${req.body.Message}  </li>
               <li>Will you be bringing any patients with you to WMH?: ${req.body.Patients}  </li>
               <li>Are you currently paneled with any insurance company?: ${req.body.Insurance}  </li>
               <li>Are you opposed to working with any specific group?: ${req.body.Opposed} </li>
               <li>If yes, specify: ${req.body.Specify} </li>
               <li>Resume: <a href='https://www.wilmingtonmentalhealth.com/cv/uploads/${req.file.originalname}'>Download Resume</a> </li>
               </ul>`}


    smtpTrans.sendMail(mailOpts, (error, response) => {
        if (error) {
            res.render('index')
        }
        else {
            res.render('index')
        }
    })
})

app.post('/applyadmin', uploadStorage.single('cv'), (req, res) => {
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
        to: `${req.body.to}`,
        // to: 'seanhart23@gmail.com',
        subject: 'New application from your website',
        html: `<h1>${req.body.Title} </h1>
               <hr><br>
               <ul>
               <li>Applicant Name: ${req.body.Name}  </li>
               <li>Email Address: ${req.body.Email}  </li>
               <li>Contact Number: ${req.body.Number}  </li>
               <li>License: ${req.body.Type}  </li>
               <li>Specialties: ${req.body.Specialties}  </li>
               <li>Message: ${req.body.Message}  </li>
               <li>Do you have any previous administrative experience in the mental health field?: ${req.body.Experience}  </li>
               <li>What specific administrative skills do you consider to be your strong points?: ${req.body.Strengths}  </li>
               <li>Resume: <a href='https://www.wilmingtonmentalhealth.com/cv/uploads/${req.file.originalname}'>Download Resume</a> </li>
               </ul>`}


    smtpTrans.sendMail(mailOpts, (error, response) => {
        if (error) {
            res.render('index')
        }
        else {
            res.render('index')
        }
    })
})

app.post('/contact', uploadStorage.single('cv'), (req, res) => {
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
        to: `${req.body.to}`,
        // to: 'seanhart23@gmail.com',
        subject: 'New message from your website',
        html: `<h1>You've recieved a new message through your website!</h1>
               <hr><br>
               <ul>
               <li>Name: ${req.body.Name}  </li>
               <li>Email Address: ${req.body.Email}  </li>
               <li>Contact Number: ${req.body.Number}  </li>
               <li>Message: ${req.body.Message}  </li>`}


    smtpTrans.sendMail(mailOpts, (error, response) => {
        if (error) {
            res.render('index')
        }
        else {
            res.render('index')
        }
    })
})

//TELL APP TO LISTEN TO PORT AND IP
app.listen(process.env.PORT || 3001, process.env.IP, function(){
// app.listen(process.env.PORT, process.env.IP, function(){
// app.listen(3000, process.env.IP, function(){
    console.log("================================");
    console.log("The WMH server has started on 3001!");
    console.log("================================");
});