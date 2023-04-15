const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json({limit: "1mb"}));

app.set('views', './src/views');
app.set('view engine', 'ejs');

// const { setData } = require('./src/dataController')
const Datastore = require('nedb');
const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (req, res) => {
    database.find({}, (err, data) => {
        res.json(data);
    });
});

app.get('/', (req, res) => {
    res.render('login')
})

app.get('/callback', (req, res) => {
    database.insert({ "code": req.query.code})
    res.render('year');
})

app.post('/callback', (req, res) => {

})

app.listen(3000, () => {
    console.log('aplication running!');
});

