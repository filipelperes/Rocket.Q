import Section from './section.js';

const section = Section();

const form = document.querySelector('#home main section:first-child form');
const input = document.querySelector('#home main section:first-child form input');
const button = document.querySelector('#home main section:first-child form button');
const createRoomButton = document.querySelector('#home main section:last-child a.button');
let clickCondition = input.value.length === 6;

const hideElements = () => {
   const separator = document.querySelector('#home main .separator');
   const sectionToHide = document.querySelector('#home main section:last-child');

   separator.classList.add('sr-only');
   sectionToHide.classList.add('sr-only');
};

const handleClick = event => {
   event.preventDefault();
   clickCondition && form.submit();
};

const handleKey = event => {
   if (event.target.value.length === 6) {
      input.classList.replace('miss', 'ok');
      event.which === 13 && form.submit();
   } else input.classList.contains('ok') ? input.classList.replace('ok', 'miss') : input.classList.add('miss');
};

input.addEventListener('keyup', handleKey);
button.addEventListener('click', handleClick);
createRoomButton.addEventListener('click', event => {
   event.preventDefault();
   document.title = "Criar Sala - Rocket.Q";
   hideElements();
   section.modifySection();
   clickCondition = input.value.length > 0;
   input.removeEventListener('keyup', handleKey);
   input.addEventListener('keyup', section.handleKey);
});