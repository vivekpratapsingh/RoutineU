var mongoose = require('mongoose');
const ActivityLevel = require('../common/enums/activityLevel');
const WeeklyGoal = require('../common/enums/weeklyGoal');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        first_name: { type: String ,default:''},
        middle_name: { type: String ,default:''},
        last_name: { type: String ,default:''},
    },
    birthday: { type: Date },
    gender: { type: String ,enum :['male','female']},
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
    timezone: { type: Number,default : 0},
    picture: { type: String,default:'' },
    location: {
        city: { type: String,default:'' },
        country: { type: String,default:'' },
        latitude: { type: Number,default:0 },
        longitude: { type: Number ,default:0}
    },
    height : {type : Number,default : 0},
    weight : {type : Number,default : 0},
    goal :{
        starting :{
            weight : {type:Number,default : 0},
            date : {type : Date,default : new Date()}
        },
        goal_weight :{type : Number,default : 0},
        weekly_goal :{type : String,default : 'Maintain my current weight'}
    },
    activity_level : {type : String,default : 'Lightly Active'}
}, { timestamps: { createdAt: 'creation_date', updatedAt: 'updated_date' } });

UserSchema.virtual('full_name').get(function () {
    return this.name.first_name + ' ' + this.name.middle_name + ' ' + this.name.last_name;
});

UserSchema.virtual('age').get(function () {
    let today = new Date();
    let a = this.birthday;
    return ((today.getTime() - a.getTime()) / 31536000000).toPrecision(2);
})

UserSchema.virtual('url').get(function () {
    return '/users/' + this._id;
})

module.exports = mongoose.model('User', UserSchema);

