const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');



const app = express();
const port = process.env.PORT;

// passport config
require('./api/config/passport')(passport);

mongoose.connect('mongodb+srv://rest-api1:rest123@rest-apis1-mqraa.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,useUnifiedTopology: true
    }).then( () => console.log("mongo connected")).catch(err => console.log(err));



app.set('views', path.join(__dirname, './api/views'));

app.use(expressLayouts);
app.set('view engine', 'ejs'); 

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Express sessiom
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// passport
app.use(passport.initialize());
app.use(passport.session());


// connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
	res.locals.error = req.flash('error');
    next();
})

const wordsRoutes = require('./api/routes/words');
const wordRoutes = require('./api/routes/word');
const userRoutes = require('./api/routes/user');
const homeRoutes = require('./api/routes/home');
const statRoutes = require('./api/routes/stats');



app.use( (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET, POST');
		return res.status(200).json({});
	}
	next();
});


app.use('/',homeRoutes);
app.use('/words', wordsRoutes);
app.use('/word', wordRoutes);
app.use('/user', userRoutes);
app.get('/stats',  async (req, res, next) => {
	const stats =await statRoutes();
	res.json(stats);
});


app.use((req, res, next) =>{
	const error = new Error("route Not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		error:{
			message: error.message
		}
	})
});


app.listen( port, function () {
	console.log(`server running on the ${port}`);
});
