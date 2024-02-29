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

// if using synchronous loading, will be called once the DOM is ready
const SECRET_KEY = '0x4AAAAAAAS8Tq_7Ft70yeWazXsQGiAhcjg';
turnstile.render('#example-container', {
  sitekey: '0x4AAAAAAAS8Tq7Wa-1P9ERU',
  callback: function (token) {
      console.log(`Challenge Success ${token}`);
      
      // Validate Turnstile token using siteverify endpoint
      const turnstileSecret = SECRET_KEY; // Replace with your Turnstile secret key
      const turnstileUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

      const turnstileData = new URLSearchParams();
      turnstileData.append('secret', turnstileSecret);
      turnstileData.append('response', token);

      fetch(turnstileUrl, {
          method: 'POST',
          body: turnstileData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              // Turnstile token validation successful, continue with your logic
              console.log('Turnstile token validation successful');
              
              // Your existing form submission logic...
          } else {
              // Turnstile token validation failed, handle accordingly
              console.error('Turnstile token validation failed');
          }
      })
      .catch(error => {
          console.error('Error during Turnstile token validation:', error);
      });
  },
});


async function handlePost(request) {
	const token = body.get('cf-turnstile-response');
	const ip = request.headers.get('CF-Connecting-IP');

	// Validate the token by calling the
	// "/siteverify" API endpoint.
	let formData = new FormData();
	formData.append('secret', SECRET_KEY);
	formData.append('response', token);
	formData.append('remoteip', ip);

	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: formData,
		method: 'POST',
	});

	const outcome = await result.json();
	if (outcome.success) {
		// ...
	}
}

function handleSubmit(e) {
  
}

button.addEventListener("click", handleSubmit);

