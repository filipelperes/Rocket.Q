import Modal from './modal.js';

const modal = Modal();

const checkButtons = document.querySelectorAll("#room .question-wrapper .actions a.check");
const deleteButton = document.querySelectorAll("#room .question-wrapper .actions a.delete");
const buttonRoomId = document.querySelector('#room #room-id');
const url = new URLSearchParams(window.location.search);

const handleClick = (event, check = false) => {
   event.preventDefault();

   const { id: roomId } = buttonRoomId.dataset;
   const { id: questionId } = event.target.dataset;

   modal.setAttrAction(check, roomId, questionId);
   modal.fillModal(check);
   modal.open();
};

checkButtons.forEach(button => {
   button.addEventListener('click', event => handleClick(event, true));
});

deleteButton.forEach(button => {
   button.addEventListener('click', handleClick);
});

buttonRoomId.addEventListener('click', event => navigator.clipboard.writeText(buttonRoomId.dataset.id));

if (url.get('wrongPass') !== null) {
   confirm('Digite a senha correta!');
   document.querySelector(`#room .question-wrapper .actions a.${url.get('slug')}[data-id='${url.get('question')}']`).click();
   window.history.pushState({}, '', `/room?id=${buttonRoomId.dataset.id}`);
}