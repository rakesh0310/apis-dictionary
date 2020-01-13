const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const mongoose = require('mongoose');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');


const bcrypt = require('bcrypt');


router.get('/signup', (req, res, next) => {
    res.render('signup');
});

router.get('/login', (req, res, next) => {
    res.render('login');
});

router.get('/dashboard', ensureAuthenticated, (req, res, next) => {
    req.session.email = req.user.email;
    req.session.password = req.user.password;
    res.render('dashboard', {
        user: req.user
    })
});


router.post('/signup', async (req, res, next) => {

    const {email, password} = req.body;
    let errors = [];

    if(!email || !password){
        errors.push({ msg:'please fill all the fields' });
    }
    if( errors.length > 0 ){
        return res.render('signup', {
            errors,
            email,
            password
        });
    } else {
        const user = await User.find({ email: req.body.email }).exec();

        if (user.length >= 1) {
            errors.push({ msg:'Mail already exists' });
            return res.render('signup', {
                errors,
                email,
                password            
            });// 409 which means conflict with resources,  422 Un-processable entity 
        } else {
            const hashPass = await bcrypt.hash(req.body.password, 10)
                .catch(() => res.status(500).json({ error: err }));

            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hashPass
            });
            user
                .save()
                .then(result => {
                    req.flash('success_msg', 'you can login now');
                    res.redirect('/user/login');
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        }
       
    }
});

router.post('/apilogin', async (req, res, next) => {

    await User.findOne({ email: req.session.email })
        .exec()
        .then( async (user) => {
            if (!user) {
                console.log("usernot found");
            }
            if (req.session.password === user.password) {
                const new_date = Date.now(); 
                const key = jwt.sign(
                    {
                        email: user.email,
                        userId: user._id,
                        date: new_date
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: `${req.body.hour}h`
                    },

                );
                user.api_key.push(
                    {
                        key: key,
                        date :new_date,
                        Dvalue: new_date,
                        exHours: req.body.hour
                       
                    } 
                );
                

                await user.save().then(() => {
                    res.redirect('/user/dashboard');
                }).catch(err => console.log(err));

            }
        }).catch(err => console.log(err));
    

});

router.post('/api/delete', (req, res, next) => {
    const get_id = Object.keys(req.body)[0];
    User.findOne({ email: req.session.email })
        .exec()
        .then(user => {
            if (!user) {
                console.log("usernot found");
            }
            let count = -1;
            for( let i=0; i < user.api_key.length; i++ ){
                count += 1;
                if( user.api_key[i]._id == get_id ) {
                    break;
                }
            }
           
            user.api_key.splice(count, 1);
            user.save()
                .then(() => {
                    res.redirect('/user/dashboard');
                })
                .catch(err => console.log(err));


        }).catch(err => console.log(err));
    

});


router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/user/dashboard',
        failureRedirect: '/user/login',
        failureFlash : true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/user/login');
});

module.exports = router;