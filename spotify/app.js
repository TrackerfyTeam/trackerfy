const express = require('express');
const app = express();
const router = express.Router();
const functions = require('./src/js/modules.js');
const querystring = require('querystring');

require('dotenv').config();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirect_uri = 'http://localhost:3000/callback';

app.get('/login', function(req, res) {

  const state = functions.randomString(16);
  const scope = 'user-read-private user-read-email';

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
    }));
});

app.get('/callback', (req, res) => {
    res.send(req.query.code)
})

app.use('/', router);
app.listen(3000, () => {
    console.log('aplication running!');
});