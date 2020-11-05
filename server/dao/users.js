let MongoClient = require("../mongo/mongo")
let crypto = require("crypto")

let users = {};
const collection = "users"

users.insertUser = async function insertUser(data){
    let client = MongoClient.getInstance();
    let result = users.findUserByName(data)
    let user = await result
    if (user !== null){
        return undefined
    }

    data.password = crypto.createHash('sha256').update(data.password).digest('base64')
    return client.insert(collection, data);
}

users.findUserByName = function findUserByName(data){
    let client = MongoClient.getInstance();
    return new Promise(async resolve => client.findOne(collection, {userName: data.userName}, function(err, document) {
        if (err)
            resolve(undefined)
        resolve(document)
    }));
}


module.exports = users;