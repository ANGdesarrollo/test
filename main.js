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
const verifyUrl = 'https://api.hcaptcha.com/siteverify';

function handleSubmit(e) {
  console.log("entre al form")
  e.preventDefault();
  const secret = 'ES_531e1de532584a2b914d79a5933670b9';
  const token = window.hcaptcha.getResponse();

  const postData = new URLSearchParams();
  postData.append('response', token)  // Reemplaza con tu token de hCaptcha
  postData.append('secret', secret);
  const requestOptions = {
      method: 'POST',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: postData.toString(),
  };

  fetch(verifyUrl, requestOptions)
      .then(response => response.json())
      .then(data => {
          // Manejar la respuesta del servidor
          console.log('Respuesta del servidor:', data);

          if (data.success) {
              // El token de hCaptcha es válido, continuar con la lógica del negocio
              console.log('Token de hCaptcha válido');
          } else {
              // La verificación del token de hCaptcha falló, manejar en consecuencia
              console.error('La verificación del token de hCaptcha falló');
          }
      })
      .catch(error => {
          // Manejar errores durante la solicitud Fetch
          console.error('Error durante la verificación del token de hCaptcha:', error);
      });
}

button.addEventListener("click", handleSubmit);

