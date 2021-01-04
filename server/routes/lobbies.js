let express = require('express');
let router = express.Router();
let lobbies = require("../dao/lobbies")

/* GET users listing. */
router.get('/:lobbyId', async function (req, res, next) {
    await lobbies.read({userName: req.params.userName}, res)
});

router.get("/", async function (req, res, next){
    if (req.query.urlToken)
        await lobbies.readByUrlToken(req, res)
})

router.post('/', async function (req, res, next) {
    await lobbies.insertLobby(req, res)
})


module.exports = router;
