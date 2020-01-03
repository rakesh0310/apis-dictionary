const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose') 

const app = express();
const PORT = 8001;



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
app.use('/user',userRoutes)

app.use((req, res, next) =>{
	const error = new Error("route Not found");
	error.status = 404;
	next(error);
})

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error:{
			message: error.message
		}
	})
})

app.listen( PORT, function () {
	console.log(`server running on the ${PORT}`);
});
