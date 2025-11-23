
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.barra ul');
toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});