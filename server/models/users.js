var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    first_name: { type: String },
    middle_name: { type: String },
    last_name: { type: String },
    birthday: { type: Date },
    gender: { type: String },
    email: {
        type: String, required: true,
        trim: true, unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    facebookProvider: {
        type: {
            id: String,
            token: String
        },
        select: false
    },
    timezone: { type: Number },
    picture: { type: String },
    creation_date : {type:Date,default : Date.now()}
});

module.exports = mongoose.model('User', UserSchema);

