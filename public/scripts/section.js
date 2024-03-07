export default function Section() {
   const title = document.querySelector('#home main section:first-child h2');
   const form = document.querySelector('#home main section:first-child form');
   const label = document.querySelector('#home main section:first-child form label');
   const input = document.querySelector('#home main section:first-child form input');
   const button = document.querySelector('#home main section:first-child form button');

   function changeInput() {
      input.setAttribute('type', 'password');
      input.setAttribute('name', 'password');
      input.setAttribute('id', 'room-pass');
      input.setAttribute('placeholder', 'Insira uma senha');
   }

   function changeAttrs() {
      form.setAttribute('action', '/create');
      label.setAttribute('for', 'room-pass');
      changeInput();
   }

   function handleClick(event) {
      event.preventDefault();
      input.value.length > 0 && form.submit();
   }

   function handleKey(event) {
      event.preventDefault();
      (event.target.value.length > 0 && event.which === 13) && form.submit();
   }

   function modifySection() {
      title.innerHTML = 'Crie sua própria sala';
      label.innerHTML = 'Insira uma senha';
      button.innerHTML = '<img src="/images/users-w.svg" alt="Criar sala"> Criar Sala';
      changeAttrs();
   }

   return {
      handleClick,
      handleKey,
      modifySection
   };
}