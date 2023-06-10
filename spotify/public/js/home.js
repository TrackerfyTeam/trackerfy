const token = localStorage.getItem('token');

const parsedURL = new URL(location.href);
const params = new URLSearchParams(parsedURL.hash.substr(1));

if (!token) {
  const access_token = params.get("access_token");
    if (access_token) {
      const timestamp = Date.now();
      localStorage.setItem('token', JSON.stringify({
        access_token: access_token,
        timestamp: timestamp + (60 * 60 * 1000)
      }));
    }
}