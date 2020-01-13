const express = require('express');
const router = express.Router();
const Word = require('../models/words');
const checkAuth = require('../middleware/check-auth');
const setStats = require('../middleware/stats');

router.get('/:word/definitions', checkAuth, async (req, res, next) => {

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

router.get('/:word/examples', checkAuth, (req, res, next) => {
   

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
