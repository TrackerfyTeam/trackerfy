const tracks = document.querySelector('.tracks');
const selectTime = document.getElementById('time');
const selectButton = document.querySelector('.select__button');
const parsedURL = new URL(location.href);
const params = new URLSearchParams(parsedURL.hash.substr(1));
const redirect_uri = "https://trackerfydeploy.onrender.com/tracks";
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
  if (JSON.parse(localStorage.getItem('token')).timestamp <= Date.now()) {
    localStorage.removeItem('token');
    location.href = `https://accounts.spotify.com/pt-BR/authorize/?client_id=${data.clientID}&scope=${data.scope}&response_type=token&redirect_uri=${redirect_uri}&show_dialog=true`;
  }
}

selectButton.addEventListener('click', () => {

  if (selectTime.value == "recently") {
    console.log('Valor é recently');
    request("/api/tracks", "POST", {
      access_token: JSON.parse(localStorage.getItem('token')).access_token,
      time: selectTime.value
    }, (data) => {
      tracks.innerHTML = "";
      data.map((obj) => {
        const item = `
          <div class="item__container__recently-tracks">
            <div class="item__image">
              <div class="item__number">${obj[3]}</div>
                <img src="${obj[0]}" alt="">
            </div>
            <div class="item__track__name">${obj[1]}</div>
            <div class="item__artist__name">${obj[2]}</div>
            <div class="item__time">${obj[4]}</div>
          </div>
          `
        tracks.innerHTML += item
      })
    });
  } else {
    request("/api/tracks", "POST", {
      access_token: JSON.parse(localStorage.getItem('token')).access_token,
      time: selectTime.value
    }, (data) => {
      tracks.innerHTML = "";
      data.map((obj) => {
        tracks.appendChild(createDiv(obj[0], obj[1], obj[2], obj[3]));
      });
    });
  }
})

request("/api/tracks", "POST", {
  access_token: JSON.parse(localStorage.getItem('token')).access_token,
  time: "short_term"
}, (data) => {
  tracks.innerHTML = "";
  data.map((obj) => {
    tracks.appendChild(createDiv(obj[0], obj[1], obj[2], obj[3]));
  });
});


