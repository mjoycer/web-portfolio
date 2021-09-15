const router = require('express').Router();
const Bills = require('../models/bills');
const UserBills = require('../models/userBills');
const Users = require('../models/users');

const auth = require('../auth');

router.get('/', auth.verify, async (req, res) => {
      Bills.find().then(data => {
        res.send(data);
    });
});

router.get('/users', auth.verify, (req, res) => {
    Users.aggregate([
        {
            $lookup: {
                from: "bills",
                localField: "_id",
                foreignField: "users",
                as: "bills"
            }
        }, 
        {
            $out: "user-bills" 
        }]).then(data => {
            UserBills.find().then(data =>
                res.send(data)
            );
        });
});

router.post('/', auth.verify, (req, res) => {
    let newBill = new Bills(req.body);

    newBill.save().then(data => {
        // console.log(data);
        res.send(data);
    });
});

// router.put('/', auth.verify, (req, res) => {
//     Bills.aggregate
// })

module.exports = router;