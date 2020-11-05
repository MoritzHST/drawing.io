let MongoClient = require("../mongo/mongo")
let crypto = require("crypto")

let users = {};
const collection = "users"

users.hashPassword = function (password) {
    return crypto.createHash('sha256').update(password).digest('base64')
}

users.insertUser = async function insertUser(data) {
    let client = MongoClient.getInstance();
    let result = users.findUserByName(data)
    let user = await result
    if (user) {
        return undefined
    } else {
        data.password = this.hashPassword(data.password)
        return client.insert(collection, data);
    }
}

users.findUserByName = function findUserByName(data) {
    let client = MongoClient.getInstance();
    return new Promise(async resolve => {
        let result = await client.findOne(collection, {userName: data.userName})
        if (!result)
            resolve(undefined)
        else
            resolve(result)

    });
}

users.update = function update(id, data){
    let client = MongoClient.getInstance();
    return new Promise(async resolve => {
        let result = await client.update(collection, {_id: client.convertToObjectId(id)}, {$set : data} )
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