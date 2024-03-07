export default function Modal() {
   const modalWrapper = document.querySelector('.modal-wrapper');
   const modalTitle = document.querySelector('.modal h2');
   const modalDesc = document.querySelector('.modal p');
   const modalForm = document.querySelector('.modal form');
   const modalButton = document.querySelector('.modal form button');

   // CLOSE MODAL ON CLICK BUTTON CANCEL
   document.querySelector('.modal .button.cancel').addEventListener('click', close);

   function setAttrAction(check, roomId, questionId) {
      const slug = check ? "check" : "delete";
      modalForm.setAttribute('action', `/action?room-id=${roomId}&question-id=${questionId}&slug=${slug}`);
   }

   function fillModal(check) {
      check ? modalButton.classList.remove('red') : modalButton.classList.add('red');
      const text = check ? "Marcar como lida" : "Excluir esta pergunta";

      modalTitle.innerHTML = text;
      modalDesc.innerHTML = `Tem certeza que você deseja ${text.toLowerCase()}?`;
      modalButton.innerHTML = `Sim, ${check ? 'marcar como lida' : 'excluir'}`;
   }

   function open() {
      modalWrapper.classList.add('active');
   }
   function close() {
      modalWrapper.classList.remove('active');
   }

   return {
      setAttrAction,
      fillModal,
      open,
      close
   };
};