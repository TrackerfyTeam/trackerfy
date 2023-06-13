const input = document.querySelector('.select__input');
const listDropDown = document.querySelector('.listDropDown');
const selectButton = document.querySelector('.select__button');
const tracks = document.querySelector('.tracks');
const parsedURL = new URL(location.href);
const params = new URLSearchParams(parsedURL.hash.substr(1));
const redirect_uri = "https://trackerfydeploy.onrender.com/years";
const token = localStorage.getItem('token');

async function getYearsFromDatabase() {
    await fetch('https://trackerfydeploy.onrender.com/api/playlists')
        .then(response => response.json())
        .then(data => {
            let n = 1;
            data.map((obj) => {
                createItem(obj.ano);
                n++;
            })
        })
        .catch(error => {
            // Trate os erros adequadamente
            console.error('Erro:', error);
        });
}

getYearsFromDatabase();

function createItem(value) {
    const div = document.createElement('div');

    div.classList.add('item');
    div.innerHTML = value;

    div.onmousedown = () => {
        document.getElementsByTagName('input')[0].value = value;
    }

    listDropDown.appendChild(div);
}

function dropdown(p) {
    let e = document.getElementsByClassName('dropDown')[0];
    let d = ['block', 'none'];
    e.style.display = d[p];

    let t = ['0px', '0px, -10px'];

    setTimeout(() => {
        e.style.transform = 'translate(' + t[p] + ')'
    }, 0)
}

input.addEventListener("keyup", async (e) => {
    if (/^[A-Za-z]$/.test(e.key)) {
        e.preventDefault();
    } else {
        console.log(e);
        filterList();
    }
});

function filterList() {
    let value = input.value;
    const divs = listDropDown.getElementsByTagName('div');

    for (let index = 0; index < divs.length; index++) {

        let valueOption = divs[index].innerHTML;

        if (valueOption.indexOf(value) > -1) {
            divs[index].style.display = 'flex';
        } else if (value === '') {
            divs[index].style.display = 'flex';
        } else {
            divs[index].style.display = 'none';
        }
    }
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

if(input.value < 1970 || input.value > 2022){
  alert("Insira um ano válido!");
}else{
  selectButton.addEventListener('click', () => {
    request("/api/years", "POST", {
        access_token: JSON.parse(localStorage.getItem('token')).access_token,
        year: input.value
      }, (data) => {
        tracks.innerHTML = "";
        data.map((obj) => {
          tracks.appendChild(createDiv(obj[0], obj[1], obj[2], obj[3]));
        });
      });
})
}

request("/api/years", "POST", {
    access_token: JSON.parse(localStorage.getItem('token')).access_token,
    year: "2022"
  }, (data) => {
    tracks.innerHTML = "";
    data.map((obj) => {
      tracks.appendChild(createDiv(obj[0], obj[1], obj[2], obj[3]));
    });
  });




