const router = require('express').Router();
const Notes = require('../models/notes');
const auth = require('../auth');

router.get('/', (req, res) => {
    Notes.find().then(data => {
        // console.log(data);
        res.send(data);
    });
});

router.post('/', (req, res) => {
    let newNote = new Notes(req.body);

    newNote.save().then( data => {
        res.send(data);
    });
});

router.delete('/:id', (req,res) => {
    Notes.deleteOne({_id: req.params.id}).then(data => {
        if (data.deletedCount > 0) {
            res.send('Record Deleted');
        }else{
            res.send('Record not found.');
        }
    })
})

module.exports = router;