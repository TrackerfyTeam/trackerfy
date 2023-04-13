const express = require('express');
const app = express();
const router = express.Router();
const functions = require('./src/js/modules.js');
const querystring = require('querystring');
const SpotifyWebApi = require('spotify-web-api-node');

require('dotenv').config();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// credentials are optional
const spotifyApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: clientSecret,
    redirectUri: 'http://localhost:3000/callback'
});

router.get('/', (req, res, next) => {
    res.redirect(spotifyApi.createAuthorizeURL([
        'ugc-image-upload',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
        'app-remote-control',
        'streaming',
        'playlist-read-private',
        'playlist-read-collaborative',
        'playlist-modify-private',
        'playlist-modify-public',
        'user-follow-modify',
        'user-follow-read',
        'user-read-playback-position',
        'user-top-read',
        'user-read-recently-played',
        'user-library-modify',
        'user-library-read',
        'user-read-email',
        'user-read-private'
    ]))
});

router.get('/callback', async (req, res, next) => {
    const code = req.query.code;
    spotifyApi.authorizationCodeGrant(code).then((response) => {
        res.send(JSON.stringify(response));
        let token = response.body.access_token;
        spotifyApi.setAccessToken(token);

        spotifyApi.searchTracks('track:Alright artist:Kendrick Lamar')
        .then(function(data) {
        console.log('Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name', data.body);
        }, function(err) {
        console.log('Something went wrong!', err);
        });
    });
});

app.use('/', router);
app.listen(3000, () => {
    console.log('aplication running!');
});

