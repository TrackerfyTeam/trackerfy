function createDiv(imageURL, trackName, artistName, ranking) {
  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  const div3 = document.createElement('div');
  const div4 = document.createElement('div');
  const div5 = document.createElement('div');
  const img = document.createElement('img');

  div2.innerHTML = ranking;
  div4.innerHTML = trackName;
  div5.innerHTML = artistName;
  img.setAttribute("src", imageURL);

  div1.classList.add("item__container");//div geral
  div2.classList.add("item__number");//div dos numeros
  div3.classList.add("item__image");//div das imagens
  div4.classList.add("item__track__name");//div do nome das tracks
  div5.classList.add("item__artist__name");//div do nome dos artistas

  div3.appendChild(img)
  div1.appendChild(div2);
  div1.appendChild(div3);
  div1.appendChild(div4);
  div1.appendChild(div5);

  return div1;
}

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
  ]
}

async function request(route, method, body, func) {
  await fetch(route, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(data => {
      func(data)
    })
    .catch(error => {
      console.error('Erro:', error);
    });
}

const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', () => {
  localStorage.removeItem('token');
  location.href = 'https://trackerfydeploy.onrender.com/';
})


