const express = require('express');
const app = express();
const port = 8000;

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors =  require('cors');

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/roommateApp', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UsersRouter = require('./routes/users');
const NotesRouter = require('./routes/notes');
const ChoresRouter = require('./routes/chores');
const BillsRouter = require('./routes/bills');

app.use('/users', UsersRouter);
app.use('/notes', NotesRouter);
app.use('/chores', ChoresRouter);
app.use('/bills', BillsRouter);

app.get('/', (req, res) => {res.send('Welcome to back-end haha'); });

app.listen(port, () => console.log(`Express app is listening to port ${port}`) );