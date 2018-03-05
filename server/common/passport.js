var passport = require('passport');
var FacebookStrategy = require('passport-facebook-token');
var User = require('../models/users');

module.exports = function () {

    passport.use(new FacebookStrategy({
        clientID: '1965211123733241',
        clientSecret: '249ba362370ff1663a043c2bc585a9ba'
    },
        function (accessToken, refreshToken, profile, done) {
            return User.findOne({
                'facebookProvider.id': profile.id
            }).populate('logs.exercise.exercise', 'name').populate('logs.diet.food').exec(function (err, user) {
                //no user was found, lets create new user
                if (!user) {
                    var newUser = new User({
                        email: profile.emails[0].value,
                        facebookProvider: {
                            id: profile.id,
                            token: accessToken
                        },
                        logs: {
                            water: [],
                            weight: [],
                            weekly_goal: [],
                            calories: [],
                            macros: [],
                            diet: [],
                            exercise: []
                        }
                    });
                    newUser.save(function (error, savedUser) {
                        if (error) {
                            console.log(error);
                        }
                        return done(error, savedUser);
                    });
                }
                else {
                    return done(err, user);
                }
            });
        }));

};