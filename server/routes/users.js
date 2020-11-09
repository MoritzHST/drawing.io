let express = require('express');
let router = express.Router();
let users = require("../dao/users")
let auth = require("../auth/authentification")

/* GET users listing. */
router.get('/:userName', async function (req, res, next) {
    await users.findUserByName({userName: req.params.userName, locale: req.params.locale}, res)

});

router.post('/login', async function (req, res, next) {
    await auth.login(req, res)
})

router.post('/refresh', async function (req, res, next) {
    await auth.refresh(req, res)
})

router.post('/guest', async function (req, res, next) {
    let user = await users.insertGuest(req)
    await auth.loginGuest(user, res)
})

router.post('/', async function (req, res, next) {
    await users.insertUser(req, res)
});

module.exports = router;
