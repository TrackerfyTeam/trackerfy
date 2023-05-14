const axios = require('axios');
const db = require('./database');

require('dotenv').config();
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

let access_token;
let refresh_token;
let expires_in;
let token_expirado = false;

async function getToken(code) {
    
    if (await db.getData(1) != undefined) {
        console.log('ACCESS_TOKEN JA EXISTE');
        await db.updateData(access_token, expires_in, 1);
    } else {
        const body = {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: "http://localhost:3000/callback"
        }
    
        const response = await axios({
            method: "POST",
            url: "https://accounts.spotify.com/api/token",
            data: new URLSearchParams(Object.entries(body)).toString(),
            headers: {
                Authorization: `Basic ${btoa(client_id + ":" + client_secret)}`,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    
        access_token = response.data.access_token;
        refresh_token = response.data.refresh_token;
        expires_in = response.data.expires_in;
        token_expirado = false;
        await db.insertData(access_token, expires_in, 1)
        console.log('ACCESS TOKEN FOI INSERIDO');
    }

    setTimeout(() => {
        console.log('DEI REFRESH PELA PRIMEIRA VEZ');
        refreshToken();
    }, expires_in)
}

async function refreshToken() {
    const body = {
        grant_type: "refresh_token",
        refresh_token: refresh_token
    }

    const response = await axios({
        method: "POST",
        url: "https://accounts.spotify.com/api/token",
        data: new URLSearchParams(Object.entries(body)).toString(),
        headers: {
            Authorization: `Basic ${btoa(client_id + ":" + client_secret)}`,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    
    access_token = response.data.access_token
    expires_in = response.data.expires_in
    token_expirado = false

    await db.updateData(access_token, expires_in, 1)

    setTimeout(() => {
        console.log('DEI REFRESH');
        refreshToken();
    }, expires_in)
}

async function getUsuario() {
    // if(token_expirado) await refreshToken();

    const response = await axios({
        method: "GET",
        url: "https://api.spotify.com/v1/me",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`
        }
    })

    const usuarioLogado = {
        nome: response.data.display_name,
        id: response.data.id
    }

    return usuarioLogado;
}

async function getTopUsuario() {
    // if(token_expirado) await refreshToken();

    const response = await axios({
        method: "GET",
        url: "https://api.spotify.com/v1/me/top/tracks/?time_range=long_term",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`
        }
    })

    const topItems = {
        artistas: response.data.items[0].name,
    }

    return topItems;
}

// async function getAudioAnalysis() {
//     if(token_expirado) await refreshToken();

//     const response = await axios({
//         method: "GET",
//         url: "https://api.spotify.com/v1/audio-analysis/",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${access_token}`
//         }
//     })

//     const topItems = {
//         artistas: response.data.items[2].name,
//     }

//     return topItems;
// }

module.exports = {getToken, refreshToken, getUsuario, getTopUsuario}