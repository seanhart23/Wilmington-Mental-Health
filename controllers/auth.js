const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
cookieParser   = require('cookie-parser');
const { promisify } = require('util')

var user = 'a'

const db = mysql.createConnection({
    host: '162.241.224.14',
    user: 'wmhwccom_wmh',
    password: 'n0T{BhXTUJf0',
    database: 'wmhwccom_WMH'
})

// const db = mysql.createConnection({
//     host: 'localhost', //IP address of server //
//     user: 'root',
//     password: 'Maem250123!',
//     database: 'login'
// })

exports.login = async (req, res) => {
	try {

		const { username, password } = req.body;

		if(!username || !password) {
			console.log('Error is here')
			return res.status(400).render('login', {
				message: 'Please provide username and password'
			})
		}

		db.query('SELECT * FROM users WHERE username = ?',  [username], async (error, results) => {
			if(!results || !(await bcrypt.compare(password, results[0].password) ) ) {
				res.status(401).render('login', {
					message: 'Email or password is incorrect'
				})
			} else {
				const id = results[0].id;

				const token = jwt.sign({ id: id }, mysupersecretpassword, {
					expiresIn: process.env.JWT_EXPIRES_IN
				});

				console.log('The token is: ' + token)

				const cookieOptions = {
					expires: new Date(
						Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
						),
					httpOnly: true,
				}
				res.cookie('jwt', token, cookieOptions);
				res.status(200).redirect('/dashboard');
				console.log("Username is " + req.body.username)
		}
	

	}) 

	} catch (error) {

		console.log(error)

	}
}


exports.register = (req, res) => {
	// console.log(req.body);
	const { username, password } = req.body;

	db.query('SELECT username FROM users WHERE username = ?', [username], async (error, results) => {
		if(error) {
			console.log(error)
		} 

		if( results.length > 0 ) {
			return res.render('register', {
			message: 'That username has already been used'
		})
		}

	let hashedPassword = await bcrypt.hash(password, 0);
	console.log(hashedPassword);

	db.query('INSERT INTO users SET ?', {username: username, password: hashedPassword }, (error, results) => {
		if(error) {
			console.log(error)
		} else {
			console.log('User Registered' + results)
		}
	})
	res.send ('Form Submitted')

	})
}

exports.isLoggedIn = async (req, res, next) => {
	console.log(req.cookies);
	if(req.cookies.jwt){
		try {
			const decoded = await promisify(jwt.verify)(req.cookies.jwt, 
				process.env.JWT_SECRET
				);

				console.log(decoded)

				db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
					console.log(result);
					if(!result){
						return next();
					}

					req.user = result[0];
					return next();
				});

		} catch (error) {
			return next();
		}
	} else{
		next ();

	}

}

exports.logout = async (req, res) => {
	res.cookie('jwt', 'logout', {
		expires: new Date(Date.now() * 2 * 1000),
		httpOnly: true
	});

	res.status(200).redirect('/');
}
