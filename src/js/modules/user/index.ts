import {registration, logIn, authListener, logOut, updateUserData} from '../../firebase/';
import {users, UserType, IUser} from '../../const';
import {getDisplayName, addVisibleClass, removeVisibleClass} from '../../services/';

const setUser: IUser = {
	user: null,
	initUser(handler) {
		authListener(this, handler);
	},
	logIn(email, password) {
		logIn(email, password);
	},

	logOut,
	signUp(email, password, handler) {
		registration(email, password, handler);
	},
	editUser(userName, userAvatar, handler) {
		updateUserData(userName, userAvatar, handler);
	},

	getUser(email) {
		const user = users.find((item) => item.email === email);
		return user;
	},

	authUser(user) {
		this.user = user;
	},
};

const user = (): void => {
	const loginBlock: HTMLDivElement = document.querySelector('.login');
	const loginForm: HTMLFormElement = document.querySelector('.login-form');
	const emailInput: HTMLInputElement = document.querySelector('.login-email');
	const passwordInput: HTMLInputElement = document.querySelector('.login-password');
	const registrationButton: HTMLAnchorElement = document.querySelector('.login-sign-in');
	const logOutButton: HTMLAnchorElement = document.querySelector('.exit');
	const editButton: HTMLAnchorElement = document.querySelector('.edit');
	const userNameInput: HTMLInputElement = document.querySelector('.user-name-input');
	const userAvatarInput: HTMLInputElement = document.querySelector('.user-photo-input');
	const editBlock: HTMLDivElement = document.querySelector('.user-edit');
	const userBlock: HTMLDivElement = document.querySelector('.user');
	const userName: HTMLSpanElement = document.querySelector('.user-name');
	const userAvatar: HTMLImageElement = document.querySelector('.user-avatar');
	const editForm: HTMLFormElement = document.querySelector('.user-form');
	const newPostButton: HTMLAnchorElement = document.querySelector('.button-new-post');

	const showAuthContent = (user: UserType): void => {
		const {displayName, photoURL, email} = user;
		userName.textContent = displayName ? displayName : getDisplayName(email);
		userAvatar.src = photoURL ? photoURL : './assets/img/avatar.jpeg';
		removeVisibleClass(loginBlock);
		addVisibleClass(newPostButton, userBlock);
	};

	const showUnAuthContent = (): void => {
		removeVisibleClass(userBlock);
		addVisibleClass(loginBlock);
	};

	const authDomToggle = () => {
		const user = setUser.user;
		loginForm.reset();
		if (user) {
			showAuthContent(user);
		} else {
			showUnAuthContent();
		}
	};

	authDomToggle();

	loginForm.addEventListener('submit', (evt: Event) => {
		evt.preventDefault();

		const email: string = emailInput.value;
		const password: string = passwordInput.value;

		setUser.logIn(email, password);
	});

	registrationButton.addEventListener('click', (evt: Event) => {
		evt.preventDefault();

		const email: string = emailInput.value;
		const password: string = passwordInput.value;

		setUser.signUp(email, password, authDomToggle);
	});

	logOutButton.addEventListener('click', (evt: Event) => {
		evt.preventDefault();
		setUser.logOut();
	});

	editButton.addEventListener('click', (evt: Event) => {
		const {email, displayName, photoURL} = setUser.user;
		evt.preventDefault();
		editBlock.classList.toggle('visible');
		userNameInput.value = displayName ? displayName : getDisplayName(email);
		userAvatarInput.value = photoURL || userAvatar.src;
	});

	editForm.addEventListener('submit', (evt: Event): void => {
		evt.preventDefault();
		const userNameValue: string = userNameInput.value;
		const userAvatarValue: string = userAvatarInput.value;
		setUser.editUser(userNameValue, userAvatarValue, authDomToggle);
		editBlock.classList.remove('visible');
	});

	setUser.initUser(authDomToggle);
};

export {setUser};
export default user;
