const button = document.querySelector('button');

const data = {
    clientID: '65b4e3c4153f4e99a2baa7ef3c474b14',
    scope: [
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
        ],
    redirect_uri: 'https://trackerfydeploy.onrender.com/callback'
}

const token = localStorage.getItem('token');

function login() {
    console.log('Botão clicado!');
    if (token) {
        if (JSON.parse(localStorage.getItem('token')).timestamp <= Date.now()) {
            localStorage.removeItem('token');
            location.href = `https://accounts.spotify.com/pt-BR/authorize/?client_id=${data.clientID}&scope=${data.scope}&response_type=token&redirect_uri=${data.redirect_uri}&show_dialog=true`;
        } else {
            location.href = "https://trackerfydeploy.onrender.com/callback";
        }
    } else {
        location.href = `https://accounts.spotify.com/pt-BR/authorize/?client_id=${data.clientID}&scope=${data.scope}&response_type=token&redirect_uri=${data.redirect_uri}&show_dialog=true`;
    }
}

button.addEventListener('click', (e) => {
    login();
});