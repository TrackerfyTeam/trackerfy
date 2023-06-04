const axios = require('axios');

async function getTopTracksUsuario(time, access_token) {

    const response = await axios({
        method: "GET",
        url: `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${time}`,
        headers: {
            "Content-Type": "application/json, text/plain, */*",
            Authorization: `Bearer ${access_token}`
        }
    })

    return response.data.items;

}

async function getTopArtistsUsuario(time, access_token) {

    const response = await axios({
        method: "GET",
        url: `https://api.spotify.com/v1/me/top/artists/?time_range=${time}&limit=50`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`
        }
    })

    return response.data.items;
}

async function getPlaylistById(id, access_token) {

    const response = await axios({
        method: "GET",
        url: `https://api.spotify.com/v1/playlists/${id}`,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`
        }
    })

    return response.data;
}

module.exports = { getTopArtistsUsuario, getTopTracksUsuario, getPlaylistById }