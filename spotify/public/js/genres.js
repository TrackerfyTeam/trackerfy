const selectButton = document.querySelector('.select__button');

selectButton.addEventListener('click', (e) => {
  fetch('/api/genres', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      time: "long_term"
    })
  })
    .then(response => response.json())
    .then(data => {
        // const ordem = Object.values(data).sort();
        console.log(data);
        // console.log(data);
  });
});

fetch('/api/genres', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ 
    time: "long_term"
  })
})
  .then(response => response.json())
  .then(data => {
      // const ordem = Object.values(data).sort();
      console.log(data);
      // console.log(data);
});

const ctx = document.getElementById('Chart.js');

new Chart(ctx, {
    type: 'polarArea',
    data: {
        labels: ['rap', 'taylor swift', 'funk', 'rock', 'trap', 'metal'],
        datasets: [{
            label: '# of votes',
            data: [12, 19, 3, 5, 3, 2],
            borderWidth: 1,
            backgroundColor: [
                'rgb(65, 89, 225)', 
                'rgb(65, 123, 199)',
                'rgb(65, 157, 173)',
                'rgb(64, 225, 120)',
                'rgb(105, 185, 133)',
                'rgb(145, 145, 145)',
                'rgb(225, 65, 169)',
                'rgb(225, 133, 159)',
                'rgb(225, 167, 154)',
                'rgb(225, 201, 148)',
            ]

        }]
    },
});