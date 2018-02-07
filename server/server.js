const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database') 
// ROUTES
const user = require('./routes/user');
const PORT = 8080

// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)

//SESSIONS
app.use(
	session({
		secret: 'bubbles',
		resave: false,
		saveUninitialized: false
	})
)

app.use(bodyParser.json())

//routing
app.use('/user', user);

// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
