const tracks = document.querySelector('.tracks');
const selectTime = document.getElementById('time');
const selectButton = document.querySelector('.select__button');
const parsedURL = new URL(location.href);
const params = new URLSearchParams(parsedURL.hash.substr(1));
// const redirect_uri = "https://trackerfydeploy.onrender.com/tracks";
const redirect_uri = "http://localhost:3000/genres";
const token = localStorage.getItem('token');
let tracksData;

if (!token) {
  if (!params.has("access_token")) {
    localStorage.removeItem('token');
    location.href = `https://accounts.spotify.com/pt-BR/authorize/?client_id=${data.clientID}&scope=${data.scope}&response_type=token&redirect_uri=${redirect_uri}&show_dialog=true`;
  } else {
    const access_token = params.get("access_token");
    if (access_token) {
      const timestamp = Date.now();
      localStorage.setItem('token', JSON.stringify({
        access_token: access_token,
        timestamp: timestamp + (60 * 60 * 1000)
      }));
    }
  }
} else {
  console.log(Date.now());
  if (JSON.parse(localStorage.getItem('token')).timestamp <= Date.now()) {
    localStorage.removeItem('token');
    location.href = `https://accounts.spotify.com/pt-BR/authorize/?client_id=${data.clientID}&scope=${data.scope}&response_type=token&redirect_uri=${redirect_uri}&show_dialog=true`;
  }
}



async function saveTracks() {
  const recentlyPlayed = await request("/api/genres", "POST", {
    access_token: JSON.parse(localStorage.getItem('token')).access_token
  }, async (data) => {
    return await data;
  })

  await fetch("/api/genres", {
    method: "POST",
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

  console.log(recentlyPlayed);
}

saveTracks();
// request("/api/user", "POST", {
//   data: tracksData
// }, (data) => {
//   console.log(data);
// })