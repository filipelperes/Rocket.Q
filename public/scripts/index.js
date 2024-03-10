import Section from './section.js';

const section = Section();

const form = document.querySelector('#home main section:first-child form');
const input = document.querySelector('#home main section:first-child form input');
const button = document.querySelector('#home main section:first-child form button');
const createRoomButton = document.querySelector('#home main section:last-child a.button');

const hideElements = () => {
   const separator = document.querySelector('#home main .separator');
   const sectionToHide = document.querySelector('#home main section:last-child');

   separator.classList.add('sr-only');
   sectionToHide.classList.add('sr-only');
};

const handleClick = event => {
   event.preventDefault();
   input.value.length === 6 && form.submit();
};

const handleKey = event => {
   if (event.target.value.length === 6) {
      input.classList.replace('miss', 'ok');
      event.which === 13 && form.submit();
   } else input.classList.contains('ok') ? input.classList.replace('ok', 'miss') : input.classList.add('miss');
};

const addEventListener = (key = handleKey, click = handleClick) => {
   input.addEventListener('keyup', key);
   button.addEventListener('click', click);
};

const removeEventListener = () => {
   input.removeEventListener('keyup', handleKey);
   button.removeEventListener('click', handleClick);
};

addEventListener();
createRoomButton.addEventListener('click', event => {
   event.preventDefault();
   document.title = "Criar Sala - Rocket.Q";
   hideElements();
   section.modifySection();
   removeEventListener();
   addEventListener(section.handleKey, section.handleClick);
});