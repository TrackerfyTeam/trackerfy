const input = document.querySelector('.select__input');
const listDropDown = document.querySelector('.listDropDown');
const selectButton = document.querySelector('.select__button');
const tracks = document.querySelector('.tracks');

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
    
    div1.classList.add("item__container");
    div2.classList.add("item__number");
    div3.classList.add("item__image");
    div4.classList.add("item__track__name");
    div5.classList.add("item__artist__name");
    
    div3.appendChild(img)
    div1.appendChild(div2);
    div1.appendChild(div3);
    div1.appendChild(div4);
    div1.appendChild(div5);

    return div1;
}

async function getTracks(year) {
    fetch('/api/years', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            year: year
        })
    })
        .then(response => response.json())
        .then(data => {
            tracks.innerHTML = '';
            data.map((obj) => {
                const item = createDiv(obj[0], obj[1], obj[2], obj[3]);
                tracks.appendChild(item);
            })
        });
}

selectButton.addEventListener('click', () => {
    getTracks(Number(input.value));
})

function category(c) {
    let item = document.getElementById('item' + c).innerHTML;
    document.getElementsByTagName('input')[0].value = item;
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

function createItem(id, value) {
    const div = document.createElement('div');

    div.classList.add('item');
    div.id = `${id}`;
    div.onmousedown = category(id);
    div.innerHTML = value;

    listDropDown.appendChild(div);
}

fetch('http://localhost:3000/api/playlists')
  .then(response => response.json())
  .then(data => {
    data.map((obj) => {
        createItem(1, obj.idlink);
    })
  })
  .catch(error => {
    // Trate os erros adequadamente
    console.error('Erro:', error);
  });

input.addEventListener("keyup", async (e) => {
    if (/^[A-Za-z]$/.test(e.key)) {
        e.preventDefault();
    } else if (e.key == 'Enter') {
        getTracks(Number(input.value));
    } else {
        console.log(e);
        filterList();
    }
})

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

