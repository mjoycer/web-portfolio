const router = require('express').Router();
const Chores = require('../models/chores');

router.get('/', (req, res) => {
    Chores.find().then(data => {
        // console.log(data)
        res.send(data);
    });
});

router.post('/', (req, res) => {
    let newChore = new Chores(req.body);

    newChore.save().then(data => {
        // console.log(data);
        res.send(data);
    });
});

module.exports = router;