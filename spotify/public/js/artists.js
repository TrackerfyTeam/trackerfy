const tracks = document.querySelector('.artists__container');
const selectTime = document.getElementById('time');
const selectButton = document.querySelector('.select__button');
const parsedURL = new URL(location.href);
const params = new URLSearchParams(parsedURL.hash.substr(1));
const token = localStorage.getItem('token');
const redirect_uri = "https://trackerfydeploy.onrender.com/artists";

function createDivArtists(imageURL, artistName, ranking) {
  const div1 = document.createElement('div');
  const div2 = document.createElement('div');
  const div3 = document.createElement('div');
  const div5 = document.createElement('div');
  const img = document.createElement('img');

  div2.innerHTML = ranking;
  div5.innerHTML = artistName;
  img.setAttribute("src", imageURL);

  div1.classList.add("item__container");//div geral
  div2.classList.add("item__number");//div dos numeros
  div3.classList.add("item__image");//div das imagens
  div5.classList.add("item__artist__name");//div do nome dos artistas

  div3.appendChild(img)
  div1.appendChild(div2);
  div1.appendChild(div3);
  div1.appendChild(div5);

  return div1;
}

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
        console.log(data);
        data.map((obj) => {
          tracks.appendChild(createDivArtists(obj[0], obj[1], obj[2]));
        });
      });
})

request("/api/artists", "POST", {
    access_token: JSON.parse(localStorage.getItem('token')).access_token,
    time: "short_term"
  }, (data) => {
    tracks.innerHTML = "";
    data.map((obj) => {
      tracks.appendChild(createDivArtists(obj[0], obj[1], obj[2]));
    });
  });


