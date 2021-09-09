const router = require('express').Router();
const Bills = require('../models/bills');

router.get('/' , (req, res) => {
    Bills.find().then(data => {
        // console.log(data);
        res.send(data);
    });
});

router.post('/', (req, res) => {
    let newBill = new Bills(req.body);

    newBill.save().then(data => {
        // console.log(data);
        res.send(data);
    });
});

module.exports = router;