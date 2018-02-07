var mongoose = require('mongoose');
    passport = require('passport'),
    express = require('express'),
    jwt = require('jsonwebtoken'),
    expressJwt = require('express-jwt'),
    router = express.Router(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    passportConfig = require('./common/passport'),
    userRoutes = require('./routes/user');

//set up mongoose
mongoose.connect('mongodb://127.0.0.1:27017');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log('database connected');
});

var User = require('./models/users');

//setup configuration for facebook login
passportConfig();

var app = express();

// enable cors
var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

//rest API requirements
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// router.route('/health-check').get(function (req, res) {
//     res.status(200);
//     res.send('Hello World');
// });

var createToken = function (auth) {
    return jwt.sign({
        id: auth.id
    }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
};

var generateToken = function (req, res, next) {
    req.token = createToken(req.auth);
    next();
};

var sendToken = function (req, res) {
    res.setHeader('x-auth-token', req.token);
    res.status(200).send(req.auth);
};

router.route('/facebook')
    .post(
    passport.authenticate('facebook-token', { session: false }), function (req, res, next) {
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }

        // prepare token for API
        req.auth = {
            id: req.user.id
        };

        next();
    }, generateToken, sendToken);

//token handling middleware
var authenticate = expressJwt({
    secret: 'my-secret',
    requestProperty: 'auth',
    getToken: function (req) {
        if (req.headers['x-auth-token']) {
            return req.headers['x-auth-token'];
        }
        return null;
    }
});

var getCurrentUser = function (req, res, next) {
    User.findById(req.auth.id, function (err, user) {
        if (err) {
            next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

var getOne = function (req, res) {
    var user = req.user.toObject();

    delete user['facebookProvider'];
    delete user['__v'];

    res.json(user);
};

router.route('/me')
    .get(authenticate, getCurrentUser, getOne);

app.use('/auth', router);
app.use('/users',userRoutes);
const port = 3000;

app.listen(port,function(){
    console.log('Server started @ ' + port);
});

