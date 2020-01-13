const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Word = require('../models/words');
const checkAuth = require('../middleware/check-auth');
const setStats = require('../middleware/stats');

router.get('/randomWord', checkAuth, async (req, res, next) => {
    
    const n = await Word.countDocuments().exec();
    const r = Math.floor(Math.random() * n);
    Word.find({}).limit(1).skip(r)
        .exec()
        .then( words => {
            if (words.length < 1) {
                return res.status(401).json({// 401 unAuthorised
                    message: "data not found"
                });
            } else {
                return res.status(200).json({
                    id: words[0].word,
                    word: words[0].word
                });
            }
        });
    setStats('/randomWords');
});
module.exports = router;