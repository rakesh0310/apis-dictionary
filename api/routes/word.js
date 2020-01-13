const express = require('express');
const router = express.Router();
//const mongo = require('mongodb').MongoClient;
const Word = require('../models/words');
const checkAuth = require('../middleware/check-auth');
const setStats = require('../middleware/stats');

<<<<<<< HEAD
router.get('/:word/definitions', checkAuth, async (req, res, next) => {
=======
router.get('/:word/definitions', checkAuth, (req, res, next) => {
    console.log('at defnitons');
    mongoose.connect('mongodb+srv://rest-api1:'+process.env.MONGO_ATLAS_PW+'@rest-apis1-mqraa.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
>>>>>>> eb8aea1c61788127c5dea8e493ebfa03a1992c0d

    await Word.find( { word: req.params.word }, { defnitions: 1, _id:0 } )
        .exec()
        .then( word => {
            if (word.length < 1) {
                return res.status(401).json({// 404 unAuthorised
                    message: "data not found"
                });
            } else {
                return res.status(200).send(word[0].defnitions);
            }
        });
	setStats('/defnitions');
});

<<<<<<< HEAD
router.get('/:word/examples', checkAuth, (req, res, next) => {
   
=======
router.get('/createschem', (req, res, next) => {
    mongoose.connect('mongodb+srv://rest-api1:'+process.env.MONGO_ATLAS_PW+'@rest-apis1-mqraa.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
    Word.find({ word: "natural" })
            .exec()
            .then( word => {
                if (word.length < 1){
                    return res.status(401).json({// 404 unAuthorised
                        message: "data not found"
                    });
                } else {
                    return res.status(200).json({
                        word
                    });
                }
            });
});
*/
router.get('/:word/examples', checkAuth, (req, res, next) => {
    mongoose.connect('mongodb+srv://rest-api1:'+process.env.MONGO_ATLAS_PW+'@rest-apis1-mqraa.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
>>>>>>> eb8aea1c61788127c5dea8e493ebfa03a1992c0d

    Word.find( { word: req.params.word }, { examples: 1, _id:0 } )
        .exec()
        .then( word => {
            if (word.length < 1) {
                return res.status(401).json({// 404 unAuthorised
                    message: "data not found"
                });
            } else {
                return res.status(200).send(word[0].examples);
            }
        });
    setStats('/examples');
});


router.get('/:word/relatedWords', checkAuth, (req, res, next) => {
<<<<<<< HEAD
=======
    mongoose.connect('mongodb+srv://rest-api1:'+process.env.MONGO_ATLAS_PW+'@rest-apis1-mqraa.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
>>>>>>> eb8aea1c61788127c5dea8e493ebfa03a1992c0d

    Word.find( { word: req.params.word }, { relatedWords: 1, _id:0 } )
        .exec()
        .then( word => {
            if (word.length < 1) {
                return res.status(401).json({// 404 unAuthorised
                    message: "data not found"
                });
            } else {
                return res.status(200).send(word[0].relatedWords);
            }
        });
    setStats('/relatedWords');
});


module.exports = router;