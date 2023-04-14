const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json({limit: "1mb"}));

const Datastore = require('nedb');

const querystring = require('querystring');

const SpotifyWebApi = require('spotify-web-api-node');

const https = require('https');

const database = new Datastore('database.db');
database.loadDatabase();

require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/callback';

const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: REDIRECT_URI
});

// Rota para a página de login
app.get('/login', (req, res) => {
    // Defina os parâmetros da solicitação de autorização
    const scope = [
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
        ];
        const queryParams = querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI
        });
        
        // Redirecione o usuário para a página de autorização do Spotify
        res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
    });
    
    // Rota para a página de redirecionamento após a autorização
app.get('/callback', (req, res) => {
    const code = req.query.code;
  
    // Configure os dados da solicitação de token
    const data = querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI
    });
  
    // Configure as opções da solicitação de token
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data
    })
    .then(response => response.json())
    .then(tokenData => {
        // Faça algo com o token de acesso retornado
        database.insert(tokenData);
        console.log(tokenData);
    })
    .catch(error => {
        console.error('Erro ao buscar token de acesso:', error);
    });
});

app.get('/api', (req, res) => {
    database.find({}, (err, data) => {
        res.json(data);
    });
});

app.listen(3000, () => {
    console.log('aplication running!');
});

