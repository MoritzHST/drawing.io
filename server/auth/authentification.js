let njwt = require('njwt')
let users = require('../dao/users')
let secureRandom = require('secure-random');

let auth = {}

let signingKey = secureRandom(256, {type: 'Buffer'});

let loggedInUsers = {}

function encodeToken(tokenData) {
    let token = njwt.create(tokenData, signingKey);
    loggedInUsers[tokenData] = token
    users.update(tokenData.userId, {onlineUntil: new Date(token.body.exp * 1000)})
    return token.compact();
}

function decodeToken(token) {
    return njwt.verify(token, signingKey);
}


auth.authenticate = async function (req, res, next)  {
    const token = req.header('Access-Token');
    if (!token) {
        return next();
    }

    try {
        const decoded = decodeToken(token);
        const { userId } = decoded.body;

        let result = users.read(userId)
        let user = await result
        if (user) {
            req.user = user;
        }
    } catch (e) {
        return next();
    }

    next();
};

auth.isAuthenticated = async function(req, res, next) {
    if (req.user) {
        return next();
    }

    res.status(401);
    res.json({ error: req.i18n.t('user.notAuthenticated') });
}

auth.login = async function(req, res) {
    let data = req.body
    let result = users.findUserByName(data);
    let user = await result;

    if (!user || users.hashPassword(data.password) !== user.password) {
        res.status(401);
        await res.json({ error: req.i18n.t('user.wrongNameOrPassword' )});
    }
    user.accessToken = encodeToken({ userId: user._id });
    delete user.password
    delete user._id
    delete user.password2
    await res.json({ user });
}

auth.loginGuest = async function(req, res) {
    let result = users.findUserByName(req);
    let user = await result;
    user.accessToken = encodeToken({ userId: user._id });
    delete user.password
    delete user._id
    delete user.password2
    await res.json({ user });
}

auth.refresh = async function (req, res) {
    const accessToken = encodeToken({ userId: req.user._id });
    await res.json({ accessToken });
}

module.exports = auth;