const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const checkAuth = require('../middleware/check-auth');

router.post('/:word/definitions', checkAuth, (req, res, next) => {
    console.log('at defnitons');
    mongo.connect("mongodb://127.0.0.1:27017/", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, async (err, client) => {
        if (err) {
            throw err;
        } else {
            console.log('awaiting at defnitons');
            const randomElement = await client.db('dictionary').collection('words').find({ word: `${req.params.word}` }, { projection: { defnitions: 1, _id:0 } }).toArray();
            if (randomElement) {

                res.status(200).send(randomElement[0].defnitions);
            } else {
                res.status(404).json({
                    message: "words not found"
                });
            }
        }
    });

});


router.post('/:word/examples', checkAuth, (req, res, next) => {
    console.log('at defnitons');
    mongo.connect("mongodb://127.0.0.1:27017/", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, async (err, client) => {
        if (err) {
            throw err;
        } else {
            console.log('awaiting at defnitons');
            const randomElement = await client.db('dictionary').collection('words').find({ word: `${req.params.word}` }, { projection: { examples: 1, _id:0 } }).toArray();
            if (randomElement) {

                res.status(200).send(randomElement[0].examples);
            } else {
                res.status(404).json({
                    message: "words not found"
                });
            }
        }
    });

});


router.post('/:word/relatedWords', checkAuth, (req, res, next) => {
    console.log('at defnitons');
    mongo.connect("mongodb://127.0.0.1:27017/", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, async (err, client) => {
        if (err) {
            throw err;
        } else {
            console.log('awaiting at related');
            const randomElement = await client.db('dictionary').collection('words').find({ word: `${req.params.word}` }, { projection: {  relation:1, _id:0 } }).toArray();
            if (randomElement) {

                res.status(200).send(randomElement[0].relation);
            } else {
                res.status(404).json({
                    message: "words not found"
                });
            }
        }
    });

});


/*router.get('/:word/examples', (req, res, next) =>{
    res.status(200).json({
        message: 'on the /word'
    });
});



router.get('/:word/definitions', (req, res, next) =>{
    res.status(200).json({
        message: 'on the /word'
    });
});
*/


module.exports = router;