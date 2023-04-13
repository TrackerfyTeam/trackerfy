require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const TOKEN_API_URL = "https://accounts.spotify.com/api/token";

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault(); // evitar que a página seja recarregada

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const basicAuth = atbo(`${CLIENT_ID}:${CLIENT_SECRET}`); // codificar as credenciais em Base64

  fetch(TOKEN_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${basicAuth}`,
    },
    body: new URLSearchParams({
      grant_type: "password",
      username: username,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const accessToken = data.access_token;
      // armazenar o token de acesso em uma variável ou em um cookie
      console.log(`Token de acesso: ${accessToken}`);
    })
    .catch((error) => {
      console.error("Erro ao obter token de acesso:", error);
    });
});