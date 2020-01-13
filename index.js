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

<<<<<<< HEAD
// passport config
require('./api/config/passport')(passport);

mongoose.connect('mongodb+srv://rest-api1:'+process.env.MONGO_ATLAS_PW+'@rest-apis1-mqraa.mongodb.net/test?retryWrites=true&w=majority', {
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
=======
const getRoute = (req) => {
    const route = req.route ? req.route.path : ''; // check if the handler exist
    const baseUrl = req.baseUrl ? req.baseUrl : ''; // adding the base url if the handler is child of other handler

    return route ? `${baseUrl === '/' ? '' : baseUrl}${route}` : 'unknown route';
}

const fs = require('fs');
const FILE_PATH = 'stats.json';

// read json object from file
const readStats = () => {
    let result = {};
    try {
        result = JSON.parse(fs.readFileSync(FILE_PATH));
    } catch (err) {
        console.error(err);
    }
    return result;
}

// dump json object to file
const dumpStats = (stats) => {
    try {
        fs.writeFileSync(FILE_PATH, JSON.stringify(stats), { flag: 'w+' });
    } catch (err) {
        console.error(err);
    }
}

app.use((req, res, next) => {
    res.on('finish', () => {
        const stats = readStats();
        if(res.statusCode === 200){
            const event = `${getRoute(req)} ${res.statusCode}`;
            stats[event] = stats[event] ? stats[event] + 1 : 1;
        }
        
        dumpStats(stats);
    })
    next()
})
>>>>>>> eb8aea1c61788127c5dea8e493ebfa03a1992c0d


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
<<<<<<< HEAD
app.use('/user', userRoutes);
app.get('/stats',  async (req, res, next) => {
	const stats =await statRoutes();
	res.json(stats);
});


=======
app.use('/user',userRoutes);
app.get('/stats/', (req, res) => {
    res.json(readStats())
});
>>>>>>> eb8aea1c61788127c5dea8e493ebfa03a1992c0d
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
