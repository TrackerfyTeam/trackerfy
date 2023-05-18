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
    res.render('home.ejs');
    await spotifyApi.getToken(req.query.code);
    const playlistId = await db.getPlaylistByYear(2022);
    const playlist = await spotifyApi.getPlaylistById(playlistId);
    const playlistTracks = playlist.tracks.items
    const nomes = playlistTracks.map((obj) => {
        return obj.track.name
    })
    console.log(nomes);
});

// app.get('/user', async (req, res) => {
//     console.log('página acessada');
// })

app.get('/years', async (req, res) => {
    res.render('topYears');
})

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

