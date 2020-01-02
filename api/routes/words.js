const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const checkAuth = require('../middleware/check-auth');

router.post('/randomWord', checkAuth, (req, res, next) => {
    
    mongo.connect("mongodb://127.0.0.1:27017/",{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        },
        async (err, client) => {
        if (err){ 
            throw err;
        } else {
            
            const n = await client.db('dictionary').collection('words').countDocuments();
            const r = Math.floor(Math.random() * n);
            
            const randomElement = await client.db('dictionary').collection('words').find({}).limit(1).skip(r).toArray();
            if(randomElement.length > 0){
                
                res.status(200).json({
                    message: randomElement[0].word
                });
                /*forEach((result, i) => {
                    console.log(`${i + 1}. name: ${result.word}`);
                });	*/																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																						
            } else {
                res.status(404).json({
                    message: "words not found"
                });
            }
        }
    });
});
module.exports = router;