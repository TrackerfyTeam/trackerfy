const button = document.querySelector('button');

data = {
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
    redirect_uri: 'http://localhost:3000/callback'
}

function login() {
    console.log('Botão clicado!');
    location.href = `https://accounts.spotify.com/authorize?response_type=token&client_id=${data.clientID}&scope=${data.scope}&redirect_uri=http://localhost:3000/callback`;
}

button.addEventListener('click', (e) => {
    login();
});