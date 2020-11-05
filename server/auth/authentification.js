import njwt from 'njwt'
import users from '../dao/users'

const {
    APP_SECRET = 'something really random',
    APP_BASE_URL = 'http://localhost:3000'
} = process.env;

export function encodeToken(tokenData) {
    return njwt.create(tokenData, APP_SECRET).compact();
}

export function decodeToken(token) {
    return njwt.verify(token, APP_SECRET).body;
}


export const authenticate = (req, res, next) => {
    const token = req.header('Access-Token');
    if (!token) {
        return next();
    }

    try {
        const decoded = decodeToken(token);
        const { userId } = decoded;

        console.log('decoded', decoded);
        console.log('userId', userId);

        if (users.find(user => user.id === userId)) {
            console.log('found user!');
            req.userId = userId;
        }
    } catch (e) {
        return next();
    }

    next();
};

export async function isAuthenticated(req, res, next) {
    if (req.userId) {
        return next();
    }

    res.status(401);
    res.json({ error: 'User not authenticated' });
}

export async function login(req, res) {
    let data = req.body
    let result = users.findOne(data.userName);
    let user = await result;


    if (!user) {
        res.status(401);
        return res.json({ error: 'Invalid email or password' });
    }

    const accessToken = encodeToken({ userId: user.id });
    return res.json({ accessToken });
}