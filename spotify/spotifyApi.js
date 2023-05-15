const axios = require('axios');
const db = require('./database');

require('dotenv').config();
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

let access_token;
let refresh_token;
let expires_in;
let tokenExpirado = false;

async function getToken(code) {
    let dbresponse = await db.getData(1);

    if (dbresponse != undefined) {
        if (dbresponse.access_token != null) {
            console.log("token already existed and was updated successfully");
            await db.updateData(access_token, expires_in, 1);
        } else {
            console.log("token was null and will be inserted");
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
            
            await db.updateData(access_token, expires_in, 1);
            console.log("token was added successfully");
        }
    } else {
        console.log("token didn't exist and will be inserted");
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
            
            await db.insertData(access_token, expires_in, 1);
            console.log("token was added successfully");
    }

    tokenExpirado = false
    setTimeout(() => {
        tokenExpirado = true
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

    await db.updateData(access_token, expires_in, 1);

    tokenExpirado = false;
    setTimeout(() => {
        tokenExpirado = true;
    }, expires_in)
}


async function getTopTracksUsuario(time) {
    if(tokenExpirado) await refreshToken();

    const response = await axios({
        method: "GET",
        url: `https://api.spotify.com/v1/me/top/tracks/?time_range=${time}`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`
        }
    })

    console.log(response.data);
}

async function getTopArtistsUsuario(time) {
    if(tokenExpirado) await refreshToken();

    const response = await axios({
        method: "GET",
        url: `https://api.spotify.com/v1/me/top/artists/?time_range=${time}`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`
        }
    })

    console.log(response.data);
}

module.exports = {getToken, refreshToken, getTopArtistsUsuario, getTopTracksUsuario}