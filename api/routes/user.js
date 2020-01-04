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
                return res.status(401).json({// 401 unAuthorised
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
                            api_key : key
                        });
                    
                }
                return res.status(401).json({
                    message:"authentication failed"
                });
            });
        });
});

                                                                                                                                                                                                                                                                                                                                                                                
module.exports = router;