const express = require('express');
const app = express();
const PORT = 8001;

 
const wordsRoutes = require('./api/routes/words');
const wordRoutes = require('./api/routes/word');
app.use('/words', wordsRoutes);
app.use('/word', wordRoutes);

app.listen( PORT, function () {
	console.log(`server running on the ${PORT}`);
});
