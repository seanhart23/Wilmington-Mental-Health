var express        = require('express'),
    request        = require("express"),
    router         = express.Router(),
    app            = express(),
    middleware       = require('../middleware'),
    request        = require('request'),
    User       = require('../models/user'),
    passport   = require('passport')


router.get('/', function(req, res){
    res.render('index');
});

router.get('/intake', function(req, res){
    res.render('intake');
});

router.get('/insurance', function(req, res){
    res.render('insurance');
});

router.get('/faq', function(req, res){
    res.render('faq');
});

router.get('/services', function(req, res){
    res.render('services');
});

router.get('/teletherapy', function(req, res){
    res.render('teletherapy');
});

router.get('/individual', function(req, res){
    res.render('individual');
});

router.get('/whatwetreat', function(req, res){
    res.render('whatwetreat');
});

router.get('/login', function(req, res){
    res.render('login');
});

router.get('/register', function(req, res){
    res.render('register');
});

router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/');
        });
    });
});

router.post('/login', passport.authenticate('local', 
    {
        successRedirect: 'dashboard', 
        failureRedirect: 'login'
    }), function(req, res){
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
module.exports = router;
