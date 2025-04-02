// you have to request access to the proxy server with the following link:
// https://cors-anywhere.herokuapp.com/corsdemo

const apiUrl = 'https://glot.io/api/run/python/latest';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Proxy URL
const url = proxyUrl + apiUrl;


function submitCode() {
    const code = document.getElementById("code-area").value;
    console.log(code);

    const data = {
        files: [{
          name: 'main.py',
          content: code
        }]
      };
    fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
  .then(data => {
    console.log('Response:', data);
    if (data.stdout) {
      console.log('Output:', data.stdout);
    }
    if (data.stderr) {
      console.error('Error:', data.stderr);
    }
  })
  .catch(error => console.error('Error:', error));
    }