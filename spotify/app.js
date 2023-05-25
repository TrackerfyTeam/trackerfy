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

async function deletePreviousToken() {
    await db.deleteData(1);
    console.log('previous token was deleted successfully.');
}

async function handleServerClose() {
    await db.deleteData(1);
    console.log('previous token was deleted successfully.');
    process.exit(0);
}

app.listen(3000, async () => {
    await deletePreviousToken();
    console.log('aplication running!');
});

process.on('SIGINT', handleServerClose);