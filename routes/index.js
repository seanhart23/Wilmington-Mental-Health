var express        = require('express'),
    request        = require("express"),
    router         = express.Router(),
    app            = express(),
    middleware     = require('../middleware'),
    request        = require('request'),
    User           = require('../models/user'),
    passport       = require('passport'),
    bodyParser     = require('body-parser'),
    dotenv         = require('dotenv'),
    cookieParser   = require('cookie-parser'),
    authController = require('../controllers/auth')
    mysql          = require('mysql');
    Stripe         = require('stripe');
    stripe         = Stripe('sk_test_51HJTkuEu13t8IjdAxry9AszPenQzzctiEHgiCBZzohftSbZkA42CnUHON1U5ztaffAQ5HmgA0eMb9uS1YWNS2xt300KGi4cZpK'),

/***** DATABASE CONNECTION *****/
dotenv.config({ path: '.env'})

const db = mysql.createConnection({
    host: '162.241.224.14',
    user: 'wmhwccom_wmh',
    password: 'n0T{BhXTUJf0',
    database: 'wmhwccom_WMH'
})

db.connect((error) => {
    if(error){
        console.log(error)
    } else {
        console.log('MYSQL Login Connected!')
    }
})

// setInterval(function () {
//     db.query('SELECT 1');
// }, 5000);

// setInterval(function () {
//     db_post.query('SELECT 1');
// }, 5000);

const db_post = mysql.createConnection({
    host: '162.241.224.14',
    user: 'wmhwccom_wmh',
    password: 'n0T{BhXTUJf0',
    database: 'wmhwccom_WMH'
})

db_post.connect((error) => {
    if(error){
        console.log(error)
    } else {
        console.log('MYSQL Blog Connected!')
    }
})


app.use(cookieParser());

/************/

router.get('/', function(req, res){
    res.render('index');
});

router.get('/intake', function(req, res){
    res.render('intake');
});

router.get('/search', function(req, res){
    res.render('search');
});

router.get('/intakepacket', function(req, res){
    res.render('intakepacket');
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

router.get('/mooring', function(req, res){
    res.render('mooring');
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



router.post('/register', authController.register)


// for action
router.post('/login',  authController.login)


router.get('/logout', authController.logout)



 

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


router.get("/new", authController.isLoggedIn, function(req, res){
    res.render("new"); 
 }); 
 
router.post('/new', authController.isLoggedIn, async (req, res) => {
    // var post = req.body
    const { 
        title, 
        content, 
        preview_image, 
        preview_content, 
        date, 
        author, 
        depression,
        anxiety,
        covid,
        mental,
        eap,
        emdr,
        anger,
        biofeedback,
        substance,
        treatments,
    } = req.body;


    db_post.query('INSERT INTO post SET ?', {
        post_title: title, 
        post_content: content, 
        post_preview_image: preview_image, 
        post_preview_content: preview_content, 
        post_date: date, 
        post_author: author, 
        post_depression: depression,
        post_anxiety: anxiety,
        post_covid: covid,
        post_mental: mental,
        post_eap: eap,
        post_emdr: emdr,
        post_anger: anger,
        post_biofeedback: biofeedback,
        post_substance: substance,
        post_treatments: treatments }, (error, results) => {
		if(error) {
			console.log(error)
		} else {
            console.log(results)
            // console.log('Post Submitted' + results)
		}
	})
    res.redirect ('/dashboard')
 });

 router.get('/edit/(:id)', authController.isLoggedIn, function(req, res){
    const id = req.params.id;
    let sql = "SELECT * FROM post WHERE post_id = " + req.params.id;
    db_post.query(sql, (err,result) => {
        if(err){
            console.log(err);
        }
        // console.log(result[0]);
        res.render('edit', {post: result[0]});
    }); 
}); 
 
router.post('/edit/(:id)', authController.isLoggedIn, function(req, res){
        // var post = req.body
        const { id, title, content, preview_image, preview_content, author, date } = req.body;
    
        db_post.query('UPDATE post SET post_title = "' + title + '", post_content = "' + content + '", post_preview_image = "' + preview_image + '", post_author= "' + author + '", post_date = "' + date + '", post_preview_content = "' + preview_content + '"  WHERE post_id = ' + id, {post_id: id, post_title: title, post_content: content, post_preview_image: preview_image, post_preview_content: preview_content}, (error, results) => {
            if(error) {
                console.log(error)
            } else {
                console.log('Post Updated' + results)
            }
        })
        res.redirect ('/dashboard')
});



router.get('/blog', function (req, res) {
    
    let sql = "Select * from post";
    let query = db_post.query(sql, (err,result) => {
        if(err){
            console.log('Error is: ' + err);
        }
        // console.log(result);
        res.render('blog', {post: result});
    }); 
});



 router.get('/dashboard', authController.isLoggedIn, function (req, res) { 
    let sql = "Select * from post";
    let query = db_post.query(sql, (err,result) => {
        if(err){
            // console.log(err);
        }
        res.render('dashboard', {post: result});
    }); 
});


router.get("/:id", function(req, res){
    let sql = "Select * from post WHERE post_id = " + req.params.id;
    let query = db_post.query(sql, (err,result) => {
        if(err){
            // console.log(err);
        }
        // console.log(result);
        res.render('show', {post: result});
    }); 
});

router.delete('/:id', function(req, res) {
    db_post.query('DELETE FROM post WHERE post.post_id = ' + req.params.id,
        function(err, result, fields) {
            if (err) {
                console.log(err);
            } else {
                console.log("deleted Record: " + result.affectedRows);
                res.redirect('/dashboard')
            }
        });
});

module.exports = router;
