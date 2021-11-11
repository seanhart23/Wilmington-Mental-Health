var express        = require('express'),
    request        = require("express"),
    router         = express.Router(),
    app            = express(),
    request        = require('request'),
    passport       = require('passport'),
    bodyParser     = require('body-parser'),
    dotenv         = require('dotenv'),
    cookieParser   = require('cookie-parser'),
    authController = require('../controllers/auth'),
    mysql          = require('mysql'),
	multer         = require('multer'),
    Stripe         = require('stripe'),
    stripe         = Stripe('sk_live_ZPkYqgjglvANPBbH7KB0xq6Y'),
    role           = 'null',
    nodemailer      = require('nodemailer');

/***** DATABASE CONNECTION *****/
dotenv.config({ path: '.env'})

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Sean', //Switch to Sean when go live //
    password: 'Maem250123!',
    database: 'blog',
    multipleStatements: true
})

db.connect((error) => {
    if(error){
        console.log(error)
    } else {
        console.log('MYSQL Connected!')
    }
})

setInterval(function () {
    db.query('SELECT 1');
}, 5000);



app.use(cookieParser());

const storage = multer.diskStorage({
destination: (req, file, cb) => {
    cb(null, "public/images/uploads")
},
filename: (req, file, cb) => {
    cb(null, file.originalname)
},
})

const uploadStorage = multer({ storage: storage })
/************/

router.get('/', function(req, res){
    res.set('Cache-Control', 'max-age=31536000');
    let sql = "Select * from Alert";
    db.query(sql, function (error, results) {
        res.render('index', { Alert: results });
    });
});

router.get('/careers', function (req, res) {
    res.render('careers');
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

router.get('/medication', function(req, res){
    res.render('medication');
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
    let sql = "Select * from Alert";
    db.query(sql, function (error, results) {
        res.render('contact', { Alert: results });
    });
});

router.get('/emdr', function(req, res){
    res.render('emdr');
});

router.get('/rengifo', function(req, res){
    res.render('rengifo');
});

router.get('/stanfield', function(req, res){
    res.render('stanfield');
});

router.get('/seigel', function(req, res){
    res.render('seigel');
});

router.get('/kemlage', function(req, res){
    res.render('kemlage');
});

router.get('/mooring', function(req, res){
    res.render('mooring');
});

router.get('/scott', function(req, res){
    res.render('scott');
});

router.get('/henzler', function(req, res){
    res.render('henzler');
});

router.get('/patient-intake', function(req, res){
    res.render('handouts');
});

router.get('/teletherapia', function(req, res){
    res.render('teletherapia');
});

router.get('/favicon.ico', function(req, res){
    res.render('teletherapia');
});

router.get('/assessments', function(req, res){
    res.render('assessments');
});

router.get('/login', function(req, res){
    res.render('login');
});

router.get('/register', authController.isLoggedIn, function(req, res){
    res.render('register');
});

router.get('/community', function(req, res){
    res.render('community');
});

router.get('/meetourteam', function(req, res){
    res.render('meetourteam');
});

router.get('/patientintake', function (req, res) {
    res.render('patientintake');
});

router.get('/tos', function(req, res){
    res.render('tos');
});

router.get('/careers', function (req, res) {
    res.render('careers');
});

router.post('/register', authController.register);


// for action
router.post('/login',  authController.login);


router.get('/logout', authController.logout);


router.get('/thankyou', function(req, res){
    res.render('thanks');
});


router.get('/dashboard', (authController.isLoggedIn), function (req, res) { 
    role = req.user.role;
    if (role === 'admin'){
        var dbs = "Select * from post; Select * from category; Select * from events; Select * from Alert";
        db.query(dbs, [0, 1, 2, 3], function(error, results) {
            res.render('dashboard', { post: results[0], category: results[1], event: results[2], Alert: results[3]});
        });
    } else {
            res.redirect('blog');
    }

}); 

router.get('/employee-dashboard', authController.isLoggedIn, function (req, res) { 
   	res.render("employee-dashboard", {role: req.user.role})
}); 

router.post('/dashboard', authController.isLoggedIn, function (req, res) { 
	     const {category_name} = req.body;

     db.query('INSERT INTO category SET ?', {category_name: category_name}, (error, results) => {
         if (error) {
             console.log(error)
         } else {
             console.log(results)
         }
		 res.redirect('/dashboard')
     })
})

			
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
            name: 'Wilmington Mental Health - One Time Payment for ' + data['patient'] + ' for a ' + data['type'],
          },
          unit_amount: data['amount'],
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://wilmingtonmentalhealth.com/thankyou',
    cancel_url: 'https://wilmingtonmentalhealth.com',
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
    success_url: 'https://wilmingtonmentalhealth.com/thankyou',
    cancel_url: 'https://wilmingtonmentalhealth.com',
  });

  res.json({ id: session.id });
});


router.get("/new", authController.isLoggedIn, function(req, res){
    var user = {role: req.user.role}
	let sql = "Select * from category";
    db.query(sql, (err,result) => {
        if(err){
            console.log('Error is: ' + err);
        }
        // console.log(result);
   		 res.render("new", {user, category: result})
		
    }); 
 }); 
 
 router.get("/comment", function(req, res){
    res.render("dashboard")
 }); 

 router.post('/', function(req, res){
     const {
         name,
         email,
     } = req.body;

     db.query('INSERT INTO newsletter SET ?', {
         name: name,
         email: email,
     }, (error, results) => {
         if (error) {
             console.log(error)
         } else {
             console.log(results)
             res.render('index')
             // console.log('Post Submitted' + results)
         }
     })
 })

 router.post('/comment', async (req, res) => {

    const { 
        author, 
        comment,
        post_id
    } = req.body;


    db.query('INSERT INTO comment SET ?', {
        author: author, 
        comment: comment, 
        post_id: post_id }, (error, results) => {
		if(error) {
			console.log(error)
		} else {
            console.log(results)
            // console.log('Post Submitted' + results)
		}
    })
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
        to: `jrengifo@wmhwc.com`,
        subject: 'A new comment has been submitted on your website',
        text: `${req.body.comment}`
      }
    
      smtpTrans.sendMail(mailOpts, (error, response) => {
        if (error) {
          res.render('index') 
        }
        else {
          res.render('index')
        }
      })
    res.redirect('back');

 });
    



router.post('/new', uploadStorage.single("preview_image"), authController.isLoggedIn, async (req, res) => {
    // var post = req.body
	if (req.file != undefined) {

    const { 
        title, 
        content, 
        preview_image, 
        date, 
        author, 
        draft,
		category,
    } = req.body;

    db.query('INSERT INTO post SET ?', {
        post_title: title, 
        post_content: content, 
        post_preview_image: req.file.originalname, 
        post_date: date, 
        post_author: author, 
        draft: draft,
		post_category: category }, (error, results) => {
		if(error) {
			console.log(error)
		} else {
            console.log(results)
            // console.log('Post Submitted' + results)
		}
    })
	} else {
		    const { 
        title, 
        content, 
        date, 
        author, 
        draft,
		category,
    } = req.body;

    db.query('INSERT INTO post SET ?', {
        post_title: title, 
        post_content: content, 
        post_date: date, 
        post_author: author, 
        draft: draft,
		post_category: category }, (error, results) => {
		if(error) {
			console.log(error)
		} else {
            console.log(results)
            // console.log('Post Submitted' + results)
		}
    })
	}
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
        to: `jrengifo@wmhwc.com`,
        subject: 'A new post has been submitted on your website',
        text: `${req.body.title} by ${req.body.author}`
      }
    
      smtpTrans.sendMail(mailOpts, (error, response) => {
        if (error) {
          res.render('index') 
        }
        else {
          res.render('index')
        }
      })
    res.redirect ('/dashboard')
 });

 router.get('/edit/(:id)', authController.isLoggedIn, function(req, res){
	     const id = req.params.id;
		var sql = "Select * from post WHERE post_id = " + req.params.id + "; Select * from category";
    db.query(sql, [0, 1], function(error, results) {
        res.render('edit', {post: results[0], category: results[1]});

        });
    }); 
 
router.post('/edit/(:id)', uploadStorage.single("preview_image"), authController.isLoggedIn, function(req, res){
        // var post = req.body
        const { id, title, content, preview_image, category, author, date, draft } = req.body;
    	
	    if (req.file != undefined) {

        db.query('UPDATE post SET post_title = "' + title + '", post_content = "' + content + '", post_preview_image = "' + req.file.originalname + '", post_author= "' + author + '", post_date = "' + date + '", draft = "' + draft + '", post_category = "' + category + '" WHERE post_id = ' + id, {
			post_id: id, 
			post_title: title, 
			post_content: content, 
			post_preview_image: req.file.originalname, 
			post_category: category}, 
			(error, results) => {
            if(error) {
                console.log(error)
            } else {
                console.log('Post Updated' + results)
            }
        })
		} else {
		db.query('UPDATE post SET post_title = "' + title + '", post_content = "' + content + '", post_author= "' + author + '", 			post_date = "' + date + '", draft = "' + draft + '", post_category = "' + 		category + '" WHERE post_id = ' + id, {
			post_id: id, 
			post_title: title, 
			post_content: content, 
			post_category: category}, 
			(error, results) => {
            if(error) {
                console.log(error)
            } else {
                console.log('Post Updated' + results)
            }
					
        })
		}
        res.redirect ('/dashboard')
});



router.get('/blog', function (req, res) {
    
    let sql = "Select * from post; Select * from category";
    db.query(sql, [0,1], (err,results) => {
        if(err){
            console.log('Error is: ' + err);
        }
        // console.log(result);
        res.render('blog', {post: results[0], category: results[1]});
    }); 
});









router.delete('/show/:id', function(req, res) {
    db.query('DELETE FROM post WHERE post.post_id = ' + req.params.id,
        function(err, result, fields) {
            if (err) {
                console.log(err);
            } else {
                console.log("deleted Record: " + result.affectedRows);
                res.redirect('/dashboard')
            }
        });
});


router.delete('/show/comment/:id', function(req, res) {
    db.query('DELETE FROM comment where comment.id = ' + req.params.id),
        function(err, result, fields) {
            if (err) {
                console.log(err);
            } else {
                console.log("deleted Record: " + result.affectedRows);
            }
        };
        res.redirect('back')
});

router.get("/show/:id", function(req, res){
    var dbs = "Select * from post WHERE post_id = " + req.params.id + "; Select * from comment WHERE post_id = " + req.params.id;
    console.log(db);
    db.query(dbs, [0, 1], function(error, results) {
        res.render('show', {post: results[0], comment: results[1]});

        });
    }); 
    

//// EVENTS ////

router.get("/newevent", authController.isLoggedIn, function (req, res) {
    var user = { role: req.user.role }
    let sql = "Select * from category";
    db.query(sql, (err, result) => {
        if (err) {
            console.log('Error is: ' + err);
        }
        // console.log(result);
        res.render("newevent", { user, category: result })

    });
});


router.post('/newevent', uploadStorage.single("preview_image"), authController.isLoggedIn, async (req, res) => {
    // var post = req.body
    if (req.file != undefined) {

        const {
            title,
            content,
            preview_image,
            start,
            end,
            date,
            author,
            draft,
        } = req.body;

        db.query('INSERT INTO events SET ?', {
            name: title,
            description: content,
            preview_image: req.file.originalname,
            date: date,
            start_time: start,
            end_time: end,
            author: author,
            draft: draft,
        }, (error, results) => {
            if (error) {
                console.log(error)
            } else {
                console.log(results)
                // console.log('Post Submitted' + results)
            }
        })
    } else {
        const {
            title,
            content,
            date,
            start,
            end,
            author,
            draft,
        } = req.body;

        db.query('INSERT INTO events SET ?', {
            name: title,
            description: content,
            preview_image: req.file.originalname,
            date: date,
            start_time: start,
            end_time: end,
            author: author,
            draft: draft,
        }, (error, results) => {
            if (error) {
                console.log(error)
            } else {
                console.log(results)
            }
        })
    }
    res.redirect('/dashboard')
});

router.get('/editevent/:id', authController.isLoggedIn, function (req, res) {
    const id = req.params.id;
    var sql = "Select * from events WHERE events.id = " + req.params.id;
    db.query(sql, function (error, results) {
        res.render('editevent', { event: results });

    });
});

router.post('/editevent/(:id)', uploadStorage.single("preview_image"), authController.isLoggedIn, function (req, res) {
    // var post = req.body

    const { 
        id,
        title,
        content,
        preview_image,
        start,
        end,
        date,
        author,
        draft,
    } = req.body;

    if (req.file != undefined) {

        db.query('UPDATE events SET name = "' + title + '", description = "' + content + '", preview_image = "' + req.file.originalname + '", author= "' + author + '", date = "' + date + '", draft = "' + draft + '", start_time = "' + start + '", end_time = "' + end + '" WHERE id = ' + id, {
            id: id,
            name: title,
            description: content,
            date: date,
            start_time: start,
            end_time: end,
            preview_image: req.file.originalname
        },
            (error, results) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Event Updated' + results)
                }
            })
    } else {
        db.query('UPDATE events SET name = "' + title + '", description = "' + content + '", author= "' + author + '", date = "' + date + '", draft = "' + draft + '", start_time = "' + start + '", end_time = "' + end + '" WHERE id = ' + id, {
            id: id,
            name: title,
            description: content,
            date: date,
            start_time: start,
            end_time: end
        },
            (error, results) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Event Updated' + results)
                }

            })
    }
    res.redirect('/dashboard')
});


router.delete('/showevent/:id', function (req, res) {
    db.query('DELETE FROM events WHERE events.id = ' + req.params.id + "'",
        function (err, result, fields) {
            if (err) {
                console.log(err);
            } else {
                console.log("deleted Record: " + result.affectedRows);
                res.redirect('/dashboard')
            }
        });
});

router.get('/events', function (req, res) {

    let sql = "Select * from events";
    db.query(sql, function (error, results) {
        res.render('events', { event: results });
    });
});

router.get("/showevent/:id", function (req, res) {
    var dbs = "Select * from events WHERE id = " + req.params.id;
    db.query(dbs, function (error, results) {
        res.render('showevent', { event: results });
    });
});

//// Anouncements ////

router.get("/newAnouncement", authController.isLoggedIn, function (req, res) {
    var user = { role: req.user.role }
    let sql = "Select * from Alert";
    db.query(sql, (err, result) => {
        if (err) {
            console.log('Error is: ' + err);
        }
        // console.log(result);
        res.render("newAnouncement", { user, alert: result })

    });
});

router.post('/newAnouncement', uploadStorage.single("preview_image"), authController.isLoggedIn, async (req, res) => {
    // var post = req.body
    if (req.file != undefined) {

        const {
            Message,
            headline,
            preview_image,
        } = req.body;

        db.query('INSERT INTO Alert SET ?', {
            Message: Message,
            headline: headline,
            preview_image: req.file.originalname
        }, (error, results) => {
            if (error) {
                console.log(error)
            } else {
                console.log(results)
                // console.log('Post Submitted' + results)
            }
        })
    } else {
        const {
            Message,
            headline
        } = req.body;

        db.query('INSERT INTO Alert SET ?', {
            Message: Message,
            headline: headline,
        }, (error, results) => {
            if (error) {
                console.log(error)
            } else {
                console.log(results)
            }
        })
    }
    res.redirect('/dashboard')
});

router.post('/editAnouncement/(:id)', uploadStorage.single("preview_image"), authController.isLoggedIn, function (req, res) {
    const {
        id,
        Message,
        headline,
    } = req.body;

    if (req.file != undefined) {

        db.query('UPDATE Alert SET Message = "' + Message + '", headline = "' + headline + '", preview_image = "' + req.file.originalname + '" WHERE id = ' + id, {
            id: id,
            Message: Message,
            headline: headline,
            preview_image: req.file.originalname,
        },
            (error, results) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Event Updated' + results)
                }
            })
    } else {
        db.query('UPDATE Alert SET Message = "' + Message + '", headline = "' + headline + '" WHERE id = ' + id, {
            id: id,
            Message: Message,
            headline: headline,
        },
            (error, results) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Alert Updated' + results)
                }
            })
    }
    res.redirect('/dashboard')
});

router.delete('/showAnouncement/:id', function (req, res) {
    db.query('DELETE FROM Alert WHERE Alert.id = ' + req.params.id,
        function (err, result, fields) {
            if (err) {
                console.log(err);
            } else {
                console.log("deleted Record: " + result.affectedRows);
                res.redirect('/dashboard')
            }
        });
});


router.get("/showAnouncement/:id", function (req, res) {
    var dbs = "Select * from Alert WHERE id = " + req.params.id;
    db.query(dbs, function (error, results) {
        res.render('showAnouncement', { Alert: results });
    });
});

router.get('/news', function (req, res) {

    let sql = "Select * from Alert";
    db.query(sql, function (error, results) {
        res.render('news', { Alert: results });
    });
});

router.get('/editAnouncement/:id', authController.isLoggedIn, function (req, res) {
    const id = req.params.id;
    var sql = "Select * from Alert WHERE Alert.id = " + req.params.id;
    db.query(sql, function (error, results) {
        res.render('editAnouncement', { Alert: results });

    });
});

router.get('*', function(req, res){
  res.status(404).render("404");
});

module.exports = router;
