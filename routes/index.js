var express        = require('express'),
    request        = require("express"),
    router         = express.Router(),
    app            = express(),
    middleware     = require('../middleware'),
    request        = require('request'),
    User           = require('../models/user'),
    passport       = require('passport'),
    bodyParser     = require('body-parser'),
    mysql          = require('mysql');
    Stripe         = require('stripe');
    stripe         = Stripe('sk_test_51HJTkuEu13t8IjdAxry9AszPenQzzctiEHgiCBZzohftSbZkA42CnUHON1U5ztaffAQ5HmgA0eMb9uS1YWNS2xt300KGi4cZpK');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Maem250123!",
//   database: 'blog_post'
// });


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

router.get('/biofeedback', function(req, res){
    res.render('biofeedback');
});

router.get('/privacy', function(req, res){
    res.render('privacy');
});

router.get('/intimidad', function(req, res){
    res.render('intimidad');
});

router.get('/accessibility', function(req, res){
    res.render('accessibility');
});

router.get('/substance', function(req, res){
    res.render('substance');
});

router.get('/corporate', function(req, res){
    res.render('corporate');
});

router.get('/specialties', function(req, res){
    res.render('specialties');
});

router.get('/paymentportal', function(req, res){
    res.render('paymentportal');
});

router.get('/whoweare', function(req, res){
    res.render('whoweare');
});

router.get('/contact', function(req, res){
    res.render('contact');
});

router.get('/emdr', function(req, res){
    res.render('emdr');
});

router.get('/rengifo', function(req, res){
    res.render('rengifo');
});

router.get('/kemlage', function(req, res){
    res.render('kemlage');
});

router.get('/blackmon', function(req, res){
    res.render('blackmon');
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

router.get('/assessments', function(req, res){
    res.render('assessments');
});

router.get('/login', function(req, res){
    res.render('login');
});

router.get('/register', function(req, res){
    res.render('register');
});

router.get('/community', function(req, res){
    res.render('community');
});

router.get('/meetourteam', function(req, res){
    res.render('meetourteam');
});

router.get('/tos', function(req, res){
    res.render('tos');
});

// router.get('/blog/new') 




// router.get('/blog' , (req, res) => {
// con.query('SELECT * FROM post', (err, rows, fields) => {
// if (!err)
// res.send(rows);
// else
// console.log(err);
// })
// } );

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

 

router.post('/create-checkout-session', async (req, res) => {
  var data = req.body
  console.log(data)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Wilmington Mental Health - One Time Payment',
          },
          unit_amount: data['amount'],
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });

  res.json({ id: session.id });
});

router.post('/create-checkout-session-gift', async (req, res) => {
  var data = req.body
  console.log(data)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Wilmington Mental Health - Gift Certificate',
          },
          unit_amount: data['amountGift'],
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  });

  res.json({ id: session.id });
});




module.exports = router;
