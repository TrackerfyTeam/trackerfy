const tracks = document.querySelector('.artists__container');
const selectTime = document.getElementById('time');
const selectButton = document.querySelector('.select__button');
const parsedURL = new URL(location.href);
const params = new URLSearchParams(parsedURL.hash.substr(1));
const redirect_uri = "http://localhost:3000/artists";
const token = localStorage.getItem('token');

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

selectButton.addEventListener('click', () => {
    request("/api/artists", "POST", {
        access_token: JSON.parse(localStorage.getItem('token')).access_token,
        time: selectTime.value
      }, (data) => {
        tracks.innerHTML = "";
        data.map((obj) => {
          tracks.appendChild(createDiv(obj[0], obj[1], obj[2], obj[3]));
        });
      });
})

request("/api/artists", "POST", {
    access_token: JSON.parse(localStorage.getItem('token')).access_token,
    time: "short_term"
  }, (data) => {
    tracks.innerHTML = "";
    data.map((obj) => {
      tracks.appendChild(createDiv(obj[0], obj[1], obj[2], obj[3]));
    });
  });


