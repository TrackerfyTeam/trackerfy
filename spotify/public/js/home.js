const main = document.querySelector('.presentation__container');
const parsedURL = new URL(location.href);
const params = new URLSearchParams(parsedURL.hash.substr(1));
const redirect_uri = "http://localhost:3000/callback"
const tokenRequested = localStorage.getItem('token');

if (!tokenRequested) {
  if (!params.has("access_token")) {
    localStorage.removeItem('token');
    location.href = `https://accounts.spotify.com/pt-BR/authorize/?client_id=${data.clientID}&scope=${data.scope}&response_type=token&redirect_uri=${redirect_uri}&show_dialog=true`;
  } else {
    const access_token = params.get("access_token");
    if (access_token) {
      localStorage.setItem('token', JSON.stringify({ access_token }));
    }
  }
}

request("/api/home", "POST", {
  access_token: JSON.parse(localStorage.getItem('token')).access_token,
}, (data) => {
  data.map((obj) => {
    main.appendChild(createDiv(obj[0], obj[1], obj[2], obj[3]));
  });
});