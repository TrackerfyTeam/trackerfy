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

const tracks = document.querySelector('.tracks');
const selectTime = document.getElementById('time');
const selectButton = document.querySelector('.select__button');

selectButton.addEventListener('click', (e) => {
  console.log(selectTime.value);
  fetch('/api/tracks', {
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
          const item = createDiv(obj[0], obj[1], obj[2], obj[3]);
          tracks.appendChild(item);
        })
    });
});


