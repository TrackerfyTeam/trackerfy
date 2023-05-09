const express = require('express');
const app = express();
const methods = require('./database/database');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

require('dotenv').config();
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: "http://localhost:3000/callback",
})

app.use(express.static('public'));
app.use(express.json({limit: "1mb"}));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    methods.insertData('SERASEFOI??')
    res.render('login');
})

app.get('/callback', async (req, res) => {
    let access_token_str = localStorage.getItem('acess_token');
    if (access_token_str) {
        const access_token = JSON.parse(access_token_str).body.access_token
        
        spotifyApi.setAccessToken(access_token);
        
        spotifyApi.getPlaylist('37i9dQZEVXbMDoHDwVN2tF')
            .then(function(data) {
                const dataejs = { body: JSON.stringify(data.body.tracks.items[6].track.artists[0].name)}
                res.render('year', { dataejs });
                console.log(data.body.tracks.items[6].track.artists[0].name);
            }, function(err) {
                console.log('Something went wrong!', err);
            });
    } else {
        spotifyApi.authorizationCodeGrant(req.query.code).then((response) => {
            localStorage.setItem('acess_token', JSON.stringify(response));
            
        });
    }
});

app.listen(3000, () => {
    console.log('aplication running!');
});