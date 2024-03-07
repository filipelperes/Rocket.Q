import Section from './section.js';

const section = Section();

const button = document.querySelector('#home main section:first-child form button');
const input = document.querySelector('#home main section:first-child form input');
const createRoomButton = document.querySelector('#home main section:last-child a.button');

const hideElements = () => {
   const separator = document.querySelector('#home main .separator');
   const sectionToHide = document.querySelector('#home main section:last-child');

   separator.classList.add('sr-only');
   sectionToHide.classList.add('sr-only');
};

const handleClick = event => {
   event.preventDefault();
   input.value.length === 6 && document.querySelector('#home main section:first-child form').submit();
};

const handleKey = event => {
   if (event.target.value.length === 6) {
      input.classList.replace('miss', 'ok');
      event.which === 13 && document.querySelector('#home main section:first-child form').submit();
   } else input.classList.contains('ok') ? input.classList.replace('ok', 'miss') : input.classList.add('miss');
};

input.addEventListener('keyup', handleKey);
button.addEventListener('click', handleClick);
createRoomButton.addEventListener('click', event => {
   event.preventDefault();
   document.title = "Criar Sala - Rocket.Q";
   hideElements();
   section.modifySection();
   button.removeEventListener('click', handleClick);
   button.addEventListener('click', section.handleClick);
   input.removeEventListener('keyup', handleKey);
   input.addEventListener('keyup', section.handleKey);
});