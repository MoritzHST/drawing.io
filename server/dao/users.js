let MongoClient = require("../mongo/mongo")
let crypto = require("crypto")
let RandomNames = require("simple_random_names")
let users = {};
const collection = "users"

users.hashPassword = function (password) {
    return crypto.createHash('sha256').update(password).digest('base64')
}

users.insertUser = async function insertUser(req, res) {
    let data = req.body
    let userName = data.userName
    let password = data.password
    let password2 = data.password2

    if (!userName) {
        res.status(400)
        res.json({error: req.i18n.t("user.nameEmpty")})
        return
    }

    if (userName === "refresh" || userName === "login") {
        res.status(400)
        res.json({error: req.i18n.t("user.nameInvalid")})
        return
    }

    if (!password || !password2) {
        res.status(400)
        res.json({error: req.i18n.t("user.passwordEmpty")})
        return
    }

    if (password !== password2) {
        res.status(400)
        res.json({error: req.i18n.t("user.passwordsNotMatching")})
        return
    }

    delete data.password2
    data.password = this.hashPassword(data.password)

    result = await users.insert(data)

    if (!result) {
        res.status(400)
        res.json({error: req.i18n.t("user.nameTaken")})
        next()
    } else
        res.json({message: req.i18n.t("user.created")})
}

users.insertGuest = async function insertGuest(data) {
    let expirationDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 3) //3 Hours valid
    let result
    let user
    do {
        let randomNames = new RandomNames(data.body.language)
        let name = randomNames.getRandomName()
        console.log(name)
        user = {userName: name, expirationDate: expirationDate, guest: true}
        result = await users.insert(user)
    } while (!result)

    return user
}

users.insert = async function insert(data) {
    let client = MongoClient.getInstance();
    let result = users.findUserByName(data)
    let user = await result
    if (user) {
        return undefined
    } else {
        return client.insert(collection, data);
    }
}

users.findUserByName = function findUserByName(data, res) {
    let client = MongoClient.getInstance();
    return new Promise(async resolve => {
        let result = await client.findOne(collection, {userName: data.userName})
        if (!result) {
            if (res) {
                let t = i18next.getFixedT(data.language);
                res.status(404)
                res.json({error: t("user.notFound")})
            }

            resolve(undefined)
        } else {
            if (res) {
                delete result.password
                delete result._id
                res.json(result);
            }
            resolve(result)
        }


    });
}

users.update = function update(id, data) {
    let client = MongoClient.getInstance();
    return new Promise(async resolve => {
        let result = await client.update(collection, {_id: client.convertToObjectId(id)}, {$set: data})
        if (!result)
            resolve(undefined)
        else
            resolve(result)

    });
}

users.read = function read(id) {
    let client = MongoClient.getInstance();
    return new Promise(async resolve => {
        let result = await client.findOne(collection, {_id: client.convertToObjectId(id)})
        if (!result)
            resolve(undefined)
        else
            resolve(result)

    });
}


module.exports = users;