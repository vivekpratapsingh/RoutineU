var mongoose = require('mongoose');
const ActivityLevel = require('../common/enums/activityLevel');
const WeeklyGoal = require('../common/enums/weeklyGoal');

var Schema = mongoose.Schema;

const schemaOptions = {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: {
        createdAt: 'creation_date', updatedAt: 'updated_date',
    }
};

var UserSchema = new Schema({
    name: {
        first_name: { type: String, default: '' },
        middle_name: { type: String, default: '' },
        last_name: { type: String, default: '' },
    },
    birthday: { type: Date },
    gender: { type: String, enum: ['male', 'female'] },
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
    timezone: { type: Number, default: 0 },
    picture: { type: String, default: '' },
    location: {
        city: { type: String, default: '' },
        country: { type: String, default: '' },
        latitude: { type: Number, default: 0 },
        longitude: { type: Number, default: 0 }
    },
    height: { type: Number, default: 0 },
    macros_percentage: {
        carbohydrate: { type: Number, default: 50 },
        protein: { type: Number, default: 25 },
        fat: { type: Number, default: 25 }
    },
    weight: {
        initial: {
            weight: { type: Number, default: 0 },
            added: { type: Date, require: true, default: Date.now() }
        },
        current: {
            weight: { type: Number, default: 0 },
            added: { type: Date, require: true, default: Date.now() }
        }
    },
    logs: {
        weight: [{
            weight: { type: String, require: true },
            date: { type: Date, default: Date.now() }
        }],
        goal: {
            weight: [{
                weight: { type: String, require: true },
                date: { type: Date, default: Date.now() }
            }],
            weekly_goal: [{
                goal: {
                    type: String, require: true, default: 'Maintain my current weight', enum: [
                        'Lose 1 kg per week', 'Lose 0.75 kg per week', 'Lose 0.5 kg per week', 'Lose 0.25 kg per week',
                        'Maintain my current weight', 'Gain 0.25 kg per week', 'Gain 0.5 kg per week'
                    ]
                },
                added: { type: Date, default: Date.now() }
            }],
            calories: [{
                calories: { type: Number, require: true },
                added: { type: Date, default: Date.now() }
            }],
            macros: [{
                macros: {
                    carbohydrate: { type: Number, require: true },
                    protein: { type: Number, require: true },
                    fat: { type: Number, require: true }
                },
                added: { type: Date, default: Date.now() }
            }]
        },
        diet: [{
            food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
            servings: {
                size: {
                    amount: { type: Number, require: true },
                    unit: { type: String, default: 'gm' }
                },
                quantity: { type: Number, required: true }
            },
            added: { type: Date, default: Date.now() }
        }]
    },
    activity_level: {
        type: String, default: 'Lightly Active', enum: [
            'Not Very Active', 'Lightly Active', 'Active', 'Very Active'
        ]
    }
}, schemaOptions);

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
});

UserSchema.virtual('infoRequired').get(function () {
    if (this.height == undefined && this.height == 0 &&
        this.weight == undefined && this.weight.initial.weight == undefined && this.weight.initial.weight == 0 &&
        this.logs == undefined && this.logs.goal == undefined &&
        this.logs.goal.weight[0] == undefined && this.logs.goal.weight[0].weight == 0 &&
        this.logs.goal.calories[0] == undefined && this.logs.goal.calories[0].calories == 0 &&
        this.logs.goal.macros[0] == undefined && this.logs.goal.macros[0].macros == undefined &&
        this.logs.goal.macros[0].macros.carbohydrate == undefined && this.logs.goal.macros[0].macros.carbohydrate == 0 &&
        this.logs.goal.macros[0].macros.protein == undefined && this.logs.goal.macros[0].macros.protein == 0 &&
        this.logs.goal.macros[0].macros.fat == undefined && this.logs.goal.macros[0].macros.fat == 0) {
        return false;
    }
    return true;
});

UserSchema.virtual('current_weight').get(function () {
    if (this.logs != undefined && this.logs.goal != undefined && 
        this.logs.goal.weight[0] != undefined && this.logs.goal.weight.length !=0) {
        return this.logs.goal.weight[this.logs.goal.weight.length - 1].weight;
    }
    else {
        return 0;
    }
});

UserSchema.post('update', function (doc) {
    console.log(doc);
})

module.exports = mongoose.model('User', UserSchema);

