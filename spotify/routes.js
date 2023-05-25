const express = require('express');
const router = express.Router();
const spotifyApi = require('./spotifyApi');
const db = require('./database');

let code;

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/callback', async (req, res) => {
    code = req.query.code;
    res.render('home');
});

router.get('/tracks', (req, res) => {
    res.render('tracks');
})

router.get('/artists', (req, res) => {
    res.render('artists');
})

router.get('/genres', (req, res) => {
    res.render('genres');
})

router.get('/years', async (req, res) => {
    res.render('topYears');
});

router.get('/api/home', async (req, res) => {
    
    let n = 0;
    console.log('Fui requisitado callback');

    await spotifyApi.getToken(code);
    const playlistId = await db.getPlaylistByYear(2022);
    const playlist = await spotifyApi.getPlaylistById(playlistId);
    const playlistTracksArray = playlist.tracks.items;

    const playlistTracks = await playlistTracksArray.map((obj) => {
        let imageURL = obj.track.album.images[0].url
        let trackName = obj.track.name;
        let artistName = obj.track.artists[0].name;
        n++
        return [imageURL, trackName, artistName, n];
    });

    res.json(playlistTracks);
});

router.post('/api/tracks', async (req, res) => {
    let n = 0;
    const { time } = req.body;

    const tracksUsuario = await spotifyApi.getTopTracksUsuario(time);

    const userTracks = await tracksUsuario.map((obj) => {
        let imageURL = obj.album.images[0].url
        let trackName = obj.name;
        let artistName = obj.artists[0].name;
        n++
        return [imageURL, trackName, artistName, n];
    })

    res.json(userTracks);
});

router.post('/api/artists', async (req, res) => {
    let n = 0;
    const { time } = req.body;

    const tracksUsuario = await spotifyApi.getTopArtistsUsuario(time);

    const userTracks = await tracksUsuario.map((obj) => {
        let artistName = obj.name;
        let imageURL = obj.images[0].url;
        n++;
        return [imageURL, artistName, n];
    })

    res.json(userTracks);
});

module.exports = router;