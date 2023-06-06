const express = require('express');
const db = require('./database');
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json({limit: "1mb"}));
app.use('/', routes);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.listen(3000, async () => {
    console.log('aplication running!');
});
