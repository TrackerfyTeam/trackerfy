const SpotifyWebApi = require('spotify-web-api-node');

const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('Acessar http://localhost:3000');
    console.log('Servidor executando na porta 3000');
});

require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: 'localhost:3000'
});

spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('Token de acesso gerado: ' + data.body[""]);
      spotifyApi.setAccessToken(data.body[""]);
    },
    function(err) {
      console.log('Algo deu errado ao gerar o token de acesso!', err);
    }
  );
