import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

const button = document.getElementById("test");


function handleSubmit(e) {

  e.preventDefault();
  const secret = '0x0000000000000000000000000000000000000000';
  const token = window.hcaptcha.getResponse();
  const verifyUrl = `https://api.hcaptcha.com/siteverify?secret=${secret}&response=${token}`;
  console.log(token);


// Build payload with secret key and token.
let data = new URLSearchParams();
data.append('secret', secret);
data.append('response', token);

// Make a POST request with data payload to hCaptcha API endpoint.
fetch(verifyUrl, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
  },
})
.then(response => response.json()) 
.then(data => {
    if (data.success) {
        console.log('Successfully verified the user');
    } else {
        console.log('Error in verifying the user', data['error-codes']);
    }
})
.catch((error) => {
    console.error('Error:', error);
});
}

button.addEventListener("click", handleSubmit);

