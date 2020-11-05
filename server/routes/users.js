let express = require('express');
let router = express.Router();
let users = require("../dao/users")
let auth = require("../auth/authentification")

/* GET users listing. */
router.get('/:userName', async function (req, res, next) {
    let user = await users.findUserByName({userName: req.params.userName})
    delete user.password
    delete user._id
    res.json(user);
});

router.post('/login', async function (req, res, next) {
    await auth.login(req, res)
})

router.post('/refresh', async function (req, res, next) {
    await auth.refresh(req, res)
})

router.post('/', async function (req, res, next) {
    console.log(JSON.stringify(req.body))
    let userName = req.body.userName
    let password = req.body.password
    let password2 = req.body.password2

    if (!userName){
        res.status(400)
        res.json({error: "No Username."})
        return
    }

    if (userName === "refresh" || userName === "login") {
        res.status(400)
        res.json({error: "Invalid Username."})
        return
    }

    if (!password || !password2){
        res.status(400)
        res.json({error: "No Password."})
        return
    }

    if (password !== password2){
        res.status(400)
        res.json({error: "Passwords not matching."})
        return
    }

    delete req.body.password2

    let result = await users.insertUser(req.body)
    if (!result) {
        res.status(400)
        res.json({error: "Username already taken."})
    } else
        res.json({message: "User successfully created"})
});

module.exports = router;
