const passport = require('passport');
var expressJwt = require('express-jwt');

//token handeling middleware
exports.token = authenticate;

var authenticate = expressJwt({
    secret: 'my-secret',
    requestProperty: 'auth',
    getToken: function (req) {
        if (req.header['x-auth-token']) {
            return req.header['x-auth-token'];
        }
        return null;
    }
})


//Setup jwt token
var createToken = function (auth) {
    return jwt.sign({
        id: auth.id
    }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
}

var generateToken = function (req, res, next) {
    req.token = createToken(req.auth);
    next();
}

var sendToken = function (req, res, next) {
    res.setHeader('x-auth-token', req.token);
    res.status(200).send(req.auth);
}

exports.authenticate = function (req, res, next) {
    passport.authenticate('facebook-token', { session: false },
        function (req, res, next) {
            if (!req.user) {
                return res.send(401, 'User not authenticated');
            }

            req.auth = {
                id: req.user.id
            };
            next();
        }, generateToken, sendToken);
}
exports.get_authenticate = function (req, res, next) {
    res.send('get authenticate');
}