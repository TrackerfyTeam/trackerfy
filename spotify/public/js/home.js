const main = document.querySelector('.presentation__container');
const parsedURL = new URL(location.href);
const params = new URLSearchParams(parsedURL.hash.substr(1));
const redirect_uri = "https://trackerfydeploy.onrender.com/callback"
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

request("https://trackerfydeploy.onrender.com/api/home", "POST", {
  access_token: JSON.parse(localStorage.getItem('token')).access_token,
}, (data) => {
  data.map((obj) => {
    main.appendChild(createDiv(obj[0], obj[1], obj[2], obj[3]));
  });
});


