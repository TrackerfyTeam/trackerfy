const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', () => {
  localStorage.removeItem('token');
  location.href = 'https://trackerfydeploy.onrender.com';
})