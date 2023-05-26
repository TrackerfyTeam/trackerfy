// // selectButton.addEventListener('click', (e) => {
// //   fetch('/api/genres', {
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/json'
// //     },
// //     body: JSON.stringify({ 
// //       time: selectTime.value
// //     })
// //   })
// //     .then(response => response.json())
// //     .then(data => {
// //         console.log(data);
// //     });
// // });

fetch('/api/genres', {
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
      console.log(data);
});
