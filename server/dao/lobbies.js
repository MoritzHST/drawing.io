let MongoClient = require("../mongo/mongo")
let lobbies = {};
const collection = "lobbies"
let i18next = require('i18next')

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

module.exports = lobbies;