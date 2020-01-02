const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const mongo = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');



router.post('/signup', (req, res, next) => {
    
    mongo.connect(
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
    );
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

router.post('/login', (req, res, next) => {
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
    );
});

                                                                                                                                                                                                                                                                                                                                                                                
module.exports = router;