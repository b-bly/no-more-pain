const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./database') 
const passport = require('./passport');
// ROUTES
const user = require('./routes/user');
const injury = require('./routes/injury');
const comment = require('./routes/comments');
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 8080;
const SECRET = process.env.SECRET || bubbles;

// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

//SESSIONS
app.use(
	session({
		secret: SECRET,
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)

// PASSPORT
app.use(passport.initialize())
app.use(passport.session())

// ==== if its production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path')
	app.use('/static', express.static(path.join(__dirname, '../build/static')))
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../build/'))
	})
}

//routing
app.use('/user', user);
app.use('/injury', injury);
app.use('/comment', comment);

// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
