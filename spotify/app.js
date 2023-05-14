const express = require('express');
const db = require('./database');
const spotifyApi = require('./spotifyApi')

const app = express();

app.use(express.static('public'));
app.use(express.json({limit: "1mb"}));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('login');
})

app.get('/callback', async (req, res) => {
    res.render('playlists');

    await spotifyApi.getToken(req.query.code);
});

const server = app.listen(3000, () => {
    console.log('aplication running!');
});

server;

async function handleServerClose() {
    await db.deleteData(1);
    process.exit(0);
  }
  
  // Evento 'SIGINT' do processo
  process.on('SIGINT', handleServerClose);