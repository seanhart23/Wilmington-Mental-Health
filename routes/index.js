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

router.get('/couples', function(req, res){
    res.render('couples');
});

router.get('/family', function(req, res){
    res.render('family');
});

router.get('/group', function(req, res){
    res.render('group');
});

router.get('/anger', function(req, res){
    res.render('anger');
});

router.get('/substance', function(req, res){
    res.render('substance');
});

router.get('/specialties', function(req, res){
    res.render('specialties');
});

router.get('/whoweare', function(req, res){
    res.render('whoweare');
});

router.get('/contact', function(req, res){
    res.render('contact');
});

router.get('/rengifo', function(req, res){
    res.render('rengifo');
});

router.get('/rengifo2', function(req, res){
    res.render('rengifo2');
});

router.get('/handouts', function(req, res){
    res.render('handouts');
});

router.get('/teletherapia', function(req, res){
    res.render('teletherapia');
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
