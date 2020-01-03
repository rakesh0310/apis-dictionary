const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const mongoose = require('mongoose');
//const mongo = require('mongodb').MongoClient;

mongoose.connect('mongodb+srv://rest-api1:'+process.env.MONGO_ATLAS_PW+'@rest-apis1-mqraa.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true, useUnifiedTopology: true
});
const bcrypt = require('bcrypt');



router.post('/signup', (req, res, next) => {

    User.find( {email: req.body.email} )
        .exec()
        .then( user => {
            if(user.length >= 1){
                return res.status(409).json({
                    message: "Mail Already Exists"
                });// 409 which means conflict with resources, 422 Un-processable entity 
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user
                          .save()
                          .then(result => {
                            console.log(result);
                            res.status(201).json({
                                message: "User Created"
                            });
                          })
                          .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            })
                          });
                    }
                });
            }
        });
    
    
    
    /*mongo.connect(
        "mongodb://127.0.0.1:27017/",
        { 
            useUnifiedTopology: true, 
            useNewUrlParser: true,
        },
        async (err, client) => {
            if (err){ 
                throw err;
            } else {
                const checkExistence = await client.db('dictionary').collection('users').find({email: req.body.email}).toArray();
                if(checkExistence.length > 0){
                    
                    return res.status(409).json({
                        message: "mail Already exists"
                    });
                }
                if (req.body.email && req.body.password) {
                    const randomElement = await client.db('dictionary').collection('users').insertOne({ email: `${req.body.email}`, password: `${req.body.password}`});

                    res.status(200).json({
                        message: `UserCreated with id with token: ${randomElement.insertedId}`
                    });
                } else {
                    return res.status(409).json({
                        message: "enter valid userName and Password"
                    })
                }
            }
        }
    );*/
    /*const user = new User({
        email: req.body.email,
        password: hash
    })*/
    /*user
        .save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'User created'
            });
        }).catch( err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });*/
        
   
    
    
    /*res.status(200).json({
        message: 'on the /word'
    });*/
});

router.delete('/:userId', (req, res, next) => {
    User.remove({_id: req.params.userId })
        .exec()
        .then( result => {
            res.status(200).json({
                message: "user Deleted"
            });
        })
})
router.post('/login', (req, res, next) => {
    

    User.find({ email: req.body.email })
        .exec()
        .then( user => {
            if (user.length < 1){
                return res.status(401).json({// 404 unAuthorised
                    message: "authentication failed"
                });
            }
            bcrypt.compare( req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message:"authentication failed"
                    })
                }
                if ( result ) {
                    
                        const key = jwt.sign(
                            {
                                email: user.email,
                                userId: user._id 
                            }, 
                            process.env.JWT_KEY,
                            {
                                expiresIn: "24h"
                            },
    
                        );
                        return res.status(200).json({
                            message: 'Authentication Successfull',
                            token : key
                        });
                    
                }
                return res.status(401).json({
                    message:"authentication failed"
                });
            });
        })
    /*
    mongo.connect(
        "mongodb://127.0.0.1:27017/",
        { 
            useUnifiedTopology: true, 
            useNewUrlParser: true,
        },
        async (err, client) => {
            const randomElement = await client.db('dictionary').collection('users').findOne({ email: `${req.body.email }` });
            if(randomElement){
                if(req.body.password === randomElement.password){
                    const key = jwt.sign(
                        {
                            email: randomElement.email,
                            userId: randomElement._id 
                        }, 
                        'secret',
                        {
                            expiresIn: "24h"
                        },

                    );
                    return res.status(200).json({
                        message: 'Auth Succesfull',
                        token : key
                    });
                } else {
                    return res.status(200).json({
                        message: 'Auth failed'
                    });
                }
            } else {
                return res.status(401).json({
                    message: 'Auth Failed'
                })
            }
        }
    );*/
});

                                                                                                                                                                                                                                                                                                                                                                                
module.exports = router;