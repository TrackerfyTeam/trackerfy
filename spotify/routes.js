const express = require('express');
const router = express.Router();
const spotifyApi = require('./spotifyApi');
const db = require('./database');

let code;

router.get('/', async (req, res) => {
    res.render('login');
    await db.deleteData(1);
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
    res.render('years');
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

router.post('/api/genres', async (req, res) => {
    let n = 0;
    const { time } = req.body;

    const tracksUsuario = await spotifyApi.getTopArtistsUsuario(time);

    const genresObj = {}

    const arrayGenres = await tracksUsuario.map((obj) => {
        // console.log(obj.genres);
        return obj.genres
    })

    arrayGenres.map((array) => {
        if (array.length > 0) {
            array.forEach(element => {
                if (element in genresObj) {
                    genresObj[element] += 1;
                } else {
                    genresObj[element] = 1;
                }
            });
        }
    })

    res.json(genresObj);
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