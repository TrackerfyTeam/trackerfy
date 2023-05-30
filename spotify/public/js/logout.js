const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', () => {
  location.href = 'https://accounts.spotify.com/logout';
})