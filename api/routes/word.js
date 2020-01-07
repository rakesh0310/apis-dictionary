const express = require('express');
const router = express.Router();
//const mongo = require('mongodb').MongoClient;
const Word = require('../models/words');
const checkAuth = require('../middleware/check-auth');
const mongoose = require('mongoose')

router.get('/:word/definitions', checkAuth, (req, res, next) => {
    console.log('at defnitons');
    mongoose.connect('mongodb+srv://rest-api1:'+process.env.MONGO_ATLAS_PW+'@rest-apis1-mqraa.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });

    Word.find( { word: req.params.word }, { defnitions: 1, _id:0 } )
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

});
/*
router.get('/createschema', (req, res, next) => {
    mongoose.connect('mongodb+srv://rest-api1:'+process.env.MONGO_ATLAS_PW+'@rest-apis1-mqraa.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
       
    const word = new Word({
    _id: new mongoose.Types.ObjectId(),
	word : "natural_new",
	relatedWords : [
		{
			relationshipType : "antonym",
			words : [
				"aberrant",
				"abnormal",
				"artificial",
				"freak"
			]
		},
		{
			relationshipType : "synonym",
			words : [
				"native",
				"essential",
				"characteristic",
				"innate",
				"legitimate",
				"normal",
				"regular",
				"illegitimate",
				"bastard",
				"unregenerate"
			]
		}
	],
	defnitions : [
		{
			text : "Present in or produced by nature:  a natural pearl."
		},
		{
			text : "Of, relating to, or concerning nature:  a natural environment."
		},
		{
			text : "Conforming to the usual or ordinary course of nature:  a natural death."
		},
		{
			text : "Not acquired; inherent:  Love of power is natural to some people."
		},
		{
			text : "Having a particular character by nature:  a natural leader."
		},
		{
			text : "Biology   Not produced or changed artificially; not conditioned:  natural immunity; a natural reflex."
		},
		{
			text : "Characterized by spontaneity and freedom from artificiality, affectation, or inhibitions. See Synonyms at naive."
		},
		{
			text : "Not altered, treated, or disguised:  natural coloring; natural produce."
		},
		{
			text : "Faithfully representing nature or life."
		},
		{
			text : "Expected and accepted: “In Willie's mind marriage remained the natural and logical sequence to love”  ( Duff Cooper)."
		}
	],
	examples : [
		{
			text : "Not because so many Americans are ignorant bible-thumping bigots, but because they have a healthy and natural aversion to homosexuality - an aversion *placed there by nature* because it isn't *natural* for people of the same gender to have sexual relations."
		},
		{
			text : "It might be thought that there is nothing that can be done to begin a discussion of natural law theory in ethics other than to stipulate a meaning for ˜natural law theory™ and to proceed from there."
		},
		{
			text : "Most often, ˜non-naturalism™ denotes the metaphysical thesis that moral properties exist and are not identical with or reducible to any natural property or properties in some interesting sense of ˜natural™."
		},
		{
			text : "Since the natural end of each person is to achieve moral and spiritual perfection, it is necessary to have the means to do so, i.e., to have rights which, since they serve to realise his or her nature, are called ˜natural™."
		},
		{
			text : "Our ˜natural benevolent affections™ guide us to do good toward some small sector of humankind (a small sector composed of our friends, promisees, colleagues, family, etc.), and stifling such natural tendencies would leave only “a very feeble counterpoise to self-love” and thus little from which to develop a more extended and generalized benevolence (434)."
		}
    ]});
    word
        .save().then( result => console.log(result)).catch( err => console.log(err));
    res.status(200).json({
        message: word
    });
               
});

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

});


router.get('/:word/relatedWords', checkAuth, (req, res, next) => {
    mongoose.connect('mongodb+srv://rest-api1:'+process.env.MONGO_ATLAS_PW+'@rest-apis1-mqraa.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });

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