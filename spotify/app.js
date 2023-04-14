const express = require('express');
const app = express();
const router = express.Router();
const querystring = require('querystring');
const SpotifyWebApi = require('spotify-web-api-node');
const https = require('https');

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
    const options = {
        hostname: 'accounts.spotify.com',
        path: '/api/token',
        method: 'POST',
        headers: {
            'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };
  
    // Envie a solicitação de token
    const tokenReq = https.request(options, tokenRes => {
        tokenRes.setEncoding('utf8');
        let body = '';
        tokenRes.on('data', chunk => {
            body += chunk;
        });
        tokenRes.on('end', () => {
        const tokenData = JSON.parse(body);
        console.log(tokenData);
        // Faça algo com o token de acesso retornado
        res.send(tokenData);
        spotifyApi.setAccessToken(tokenData.access_token);
        });
    });

   

    spotifyApi.searchTracks('track:Alright artist:Kendrick Lamar')
    .then(function(data) {
    console.log('Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name', data.body);
    }, function(err) {
    console.log('Something went wrong!', err);
    });
  
    tokenReq.on('error', err => {
      console.error(err);
    });
  
    tokenReq.write(data);
    tokenReq.end();
});
  
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.use('/', router);
app.listen(3000, () => {
    console.log('aplication running!');
});



// router.get('/login', (req, res, next) => {
//     res.redirect(spotifyApi.createAuthorizeURL([
//         'ugc-image-upload',
//         'user-read-playback-state',
//         'user-modify-playback-state',
//         'user-read-currently-playing',
//         'app-remote-control',
//         'streaming',
//         'playlist-read-private',
//         'playlist-read-collaborative',
//         'playlist-modify-private',
//         'playlist-modify-public',
//         'user-follow-modify',
//         'user-follow-read',
//         'user-read-playback-position',
//         'user-top-read',
//         'user-read-recently-played',
//         'user-library-modify',
//         'user-library-read',
//         'user-read-email',
//         'user-read-private'
//     ]))
// });

// router.get('/callback', async (req, res, next) => {
//     const code = req.query.code;
//     spotifyApi.authorizationCodeGrant(code).then((response) => {
//         res.send(JSON.stringify(response));
//         let token = response.body.access_token;
//         spotifyApi.setAccessToken(token);

//         spotifyApi.searchTracks('track:Alright artist:Kendrick Lamar')
//         .then(function(data) {
//         console.log('Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name', data.body);
//         }, function(err) {
//         console.log('Something went wrong!', err);
//         });
//     });
// });