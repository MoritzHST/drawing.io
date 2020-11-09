let express = require('express');
let router = express.Router();
let lobbies = require("../dao/lobbies")

/* GET users listing. */
router.get('/:lobbyId', async function (req, res, next) {
    await lobbies.read({userName: req.params.userName})
});

router.post('/', async function (req, res, next) {
    await auth.login(req, res)
})


module.exports = router;
