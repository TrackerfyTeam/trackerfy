function createDiv(imageURL, artistName, ranking) {
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const label = document.createElement('label');
    const div4 = document.createElement('div');
    const img = document.createElement('img');
    
    div2.innerHTML = ranking + '.';
    div4.innerHTML = artistName;
    img.setAttribute("src", imageURL);
    
    div1.classList.add("artists__card");
    label.classList.add("artists__label");

    div2.classList.add("artists__number");
    div3.classList.add("artists__image");
    div4.classList.add("artist__name");
    
    div3.appendChild(img);
    label.appendChild(div2);
    label.appendChild(div4);

    div1.appendChild(div3);
    div1.appendChild(label);

    return div1;
}

const tracks = document.querySelector('.artists__container');
const selectTime = document.getElementById('time');
const selectButton = document.querySelector('.select__button');

selectButton.addEventListener('click', (e) => {
  fetch('/api/artists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      time: selectTime.value
    })
  })
    .then(response => response.json())
    .then(data => {
        tracks.innerHTML = '';
        data.map((obj) => {
          const item = createDiv(obj[0], obj[1], obj[2]);
          tracks.appendChild(item);
        })
    });
});

fetch('/api/artists', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ 
    time: "short_term"
  })
})
  .then(response => response.json())
  .then(data => {
      tracks.innerHTML = '';
      data.map((obj) => {
        const item = createDiv(obj[0], obj[1], obj[2]);
        tracks.appendChild(item);
      })
  });
