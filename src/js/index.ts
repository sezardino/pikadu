import user from './modules/user';
import posts from './modules/posts';

user();
posts();

let menuToggle = document.querySelector('#menu-toggle');
let menu = document.querySelector('.sidebar');
menuToggle.addEventListener('click', function (event) {
	event.preventDefault();
	menu.classList.toggle('visible');
});
