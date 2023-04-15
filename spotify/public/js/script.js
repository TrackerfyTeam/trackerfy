const button = document.querySelector('button')

data = {
    clientID: 'c4a70cb602e745e0bab72dd3ff52d7b5',
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
    redirect_uri: 'http://localhost:3000/callback'
}

function login() {
    console.log('Botão clicado!');
    location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${data.clientID}&scope=${data.scope}&redirect_uri=${data.redirect_uri}`
}

button.addEventListener('click', (e) => {
    login();
})