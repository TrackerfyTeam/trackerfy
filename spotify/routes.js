const express = require('express');
const router = express.Router();
const spotifyApi = require('./spotifyApi');
const db = require('./database');
const data = require('./data');

let code;

router.get('/', async (req, res) => {
    res.render('login');
    await db.deleteData(1);
});

router.get('/callback', async (req, res) => {
    if (code == undefined) {
        res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${data.clientID}&scope=${data.scope}&redirect_uri=http://localhost:3000/callback`);
        code = req.query.code;
    } else {
        res.render('home');
    }
});

router.get('/tracks', async (req, res) => {
    if (code == undefined) {
        res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${data.clientID}&scope=${data.scope}&redirect_uri=http://localhost:3000/tracks`);
        code = req.query.code;
    } else {
        res.render('tracks');
    }
})

router.get('/artists', (req, res) => {
    if (code == undefined) {
        res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${data.clientID}&scope=${data.scope}&redirect_uri=http://localhost:3000/artists`);
        code = req.query.code;
    } else {
        res.render('artists');
    }
})

router.get('/years', async (req, res) => {
    if (code == undefined) {
        res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${data.clientID}&scope=${data.scope}&redirect_uri=http://localhost:3000/years`);
        code = req.query.code;
    } else {
        res.render('years');
    }
});

router.get('/api/home', async (req, res) => {
    
    let n = 0;

    await spotifyApi.getToken(code, "http://localhost:3000/callback");
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

    await spotifyApi.getToken(code, "http://localhost:3000/tracks");
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

router.post('/api/years', async (req, res) => {
    let n = 0;

    const { year } = req.body;

    await spotifyApi.getToken(code);
    const playlistId = await db.getPlaylistByYear(year);
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

router.get('/api/playlists', async (req, res) => {
    const playlists = await db.getPlaylists();
    res.json(playlists);
});

module.exports = router;