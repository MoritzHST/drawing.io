let MongoClient = require("../mongo/mongo")
let lobbies = {};
const collection = "lobbies"
let i18next = require('i18next')
let nanoid = require("nanoid")

lobbies.read = async function (req, res) {
    let t = i18next.getFixedT(req.body.language);
    let client = MongoClient.getInstance();
    let result = await client.findOne(collection, {_id: client.convertToObjectId(id)})
    if (!result){
        res.status(404)
        res.json({error: t("lobby.notFound")})
    }
    else
        res.json(result)
}

lobbies.insertLobby = async function(req, res){
    let data = req.body
    let client = MongoClient.getInstance();
    let id = nanoid.nanoid()
    let dummy
    do {
        console.log(id)
        let result = client.findOne(collection, {urlToken: id})
        console.log(JSON.stringify(result))
    } while (dummy)
    data.urlToken = id;
    data.timestamp = new Date()
    let result = await client.insert(collection, data);
    res.json(result.ops[0])
}

module.exports = lobbies;