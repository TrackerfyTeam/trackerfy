const axios = require('axios');

require('dotenv').config();
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

exports.middlewareGlobal = async (req, res, next) => {
    console.log('rodei');

    const body = {
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: "http://localhost:3000/callback"
    }
    
    let response = await axios({
        method: "POST",
        url: "https://accounts.spotify.com/api/token",
        data: new URLSearchParams(Object.entries(body)).toString(),
        headers: {
            Authorization: `Basic ${btoa(client_id + ":" + client_secret)}`,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });

    next();
}