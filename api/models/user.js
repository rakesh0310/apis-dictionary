const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    password: { type:String, required: true},
    api_key: [
        {
            key: {type:String},
            date: {type:Date},
            Dvalue:{type:Number},
            exHours: {type:Number}
        }
    ],
     
});

module.exports = mongoose.model('User', userSchema);