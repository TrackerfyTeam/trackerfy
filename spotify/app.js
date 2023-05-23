const express = require('express');
const db = require('./database');
const spotifyApi = require('./spotifyApi')

const app = express();

// let nomes;
let code;

app.use(express.static('public'));
app.use(express.json({limit: "1mb"}));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('login');
})

app.get('/callback', async (req, res) => {
    code = req.query.code;
    res.render('home.ejs');
});

app.get('/api', async (req, res) => {
    
    let n = 0;
    console.log('Fui requisitado callback');

    await spotifyApi.getToken(code);
    const playlistId = await db.getPlaylistByYear(2022);
    const playlist = await spotifyApi.getPlaylistById(playlistId);
    const playlistTracks = playlist.tracks.items;

    const nomes = await playlistTracks.map((obj) => {
        let imageURL = obj.track.album.images[0].url
        let trackName = obj.track.name;
        let artistName = obj.track.artists[0].name;
        n++
        // db.insertTracksData(imageURL, trackName, artistName, n);
        return [imageURL, trackName, artistName, n];
    });

    res.json(nomes)
})

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

