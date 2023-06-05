const express = require('express');
const router = express.Router();
const spotifyApi = require('./spotifyApi');
const db = require('./database');

router.get('https://trackerfy.onrender.com/', async (req, res) => {
    res.render('login');
});

router.get('/callback', async (req, res) => {
    res.render('home');
});

router.get('/tracks', async (req, res) => {
    res.render('tracks');
})

router.get('/artists', (req, res) => {
    res.render('artists');
})

router.get('/years', async (req, res) => {
    res.render('years');
});

router.post('/api/home', async (req, res) => {
    let n = 0;
    const { access_token } = req.body
    const playlistId = await db.getPlaylistByYear(2022);
    const playlist = await spotifyApi.getPlaylistById(playlistId, access_token);
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

    const { access_token, time } = req.body;
    let n = 0;
    const tracksUsuario = await spotifyApi.getTopTracksUsuario(time, access_token);
    const userTrack = await tracksUsuario.map((obj) => {
        let imageURL = obj.album.images[0].url
        let trackName = obj.name;
        let artistName = obj.artists[0].name;
        n++
        return [imageURL, trackName, artistName, n];
    })
    res.json(userTrack);
});

router.post('/api/artists', async (req, res) => {
    let n = 0;
    const { access_token, time } = req.body;
    const tracksUsuario = await spotifyApi.getTopArtistsUsuario(time, access_token);
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
    const { access_token, year } = req.body;
    const playlistId = await db.getPlaylistByYear(year);
    const playlist = await spotifyApi.getPlaylistById(playlistId, access_token);
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