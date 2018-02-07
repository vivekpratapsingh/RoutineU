var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        first_name: { type: String },
        middle_name: { type: String },
        last_name: { type: String },
    },
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
    picture: { type: String }
}, { timestamps: { createdAt: 'creation_date', updatedAt: 'updated_date' } });

UserSchema.virtual('full_name').get(function () {
    return this.name.first_name + this.name.middle_name + this.name.last_name;
});

UserSchema.virtual('age').get(function(){
    let today = new Date();
    let a  = this.birthday;
    return ((today.getTime() - a.getTime())/31536000000).toPrecision(2);
})

UserSchema.virtual('url').get(function(){
    return '/users/' + this._id;
})

module.exports = mongoose.model('User', UserSchema);

