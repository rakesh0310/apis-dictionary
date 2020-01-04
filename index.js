const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose') 

const app = express();
const port = process.env.PORT;

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



const wordsRoutes = require('./api/routes/words');
const wordRoutes = require('./api/routes/word');
const userRoutes = require('./api/routes/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use( (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET, POST');
		return res.status(200).json({});
	}
	next();
});

app.use('/words', wordsRoutes);
app.use('/word', wordRoutes);
app.use('/user',userRoutes);
app.get('/stats/', (req, res) => {
    res.json(readStats())
});
app.use((req, res, next) =>{
	const error = new Error("route Not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error:{
			message: error.message
		}
	})
});


app.listen( port, function () {
	console.log(`server running on the ${port}`);
});
