import {users, UserType, mailRegExp} from '../../const';
import {getDisplayName} from '../../services/';

interface IUser {
	user: UserType | null;
	getUser: (this: IUser, email: string) => UserType | undefined;
	authUser: (this: IUser, user: UserType) => void;
	logIn: (this: IUser, email: string, password: string, handler: () => void) => void;
	logOut: (this: IUser, handler: () => void) => void;
	signUp: (this: IUser, email: string, password: string, handler: () => void) => void;
	editUser: (this: IUser, userName: string, userAvatar: string, handler: () => void) => void;
}

const setUser: IUser = {
	user: null,
	logIn(email, password, handler) {
		if (!mailRegExp.test(email)) {
			alert('Invalid email');
			return;
		}
		const user: UserType | undefined = this.getUser(email);
		if (!user) {
			alert('Пользователь с такими данными не найден');
		} else if (user && user.password !== password) {
			alert('Wrong password');
		} else {
			this.authUser(user);
			handler();
		}
	},
	logOut(handler) {
		this.user = null;
		handler();
	},
	signUp(email, password, handler) {
		console.log(users);
		if (!mailRegExp.test(email)) {
			alert('Invalid email');
			return;
		}
		const user: UserType | undefined = this.getUser(email);
		if (user) {
			alert('Данная почта уже используется');
		} else if (!user) {
			const newUser = {email, password, displayName: getDisplayName(email)};
			users.push(newUser);
			this.authUser(newUser);
			handler();
		}
	},
	editUser(userName, userAvatar, handler) {
		this.user.displayName = userName;
		this.user.photo = userAvatar;
		handler();
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
	const userName = document.querySelector('.user-name');
	const userAvatar: HTMLImageElement = document.querySelector('.user-avatar');
	const editForm: HTMLFormElement = document.querySelector('.user-form');

	const authDomToggle = () => {
		const user: UserType | null = setUser.user;
		if (user) {
			userName.textContent = user.displayName;
			userAvatar.src = user.photo || userAvatar.src;
			loginBlock.style.display = 'none';
			userBlock.style.display = 'block';
		} else {
			loginBlock.style.display = '';
			userBlock.style.display = '';
		}
	};

	authDomToggle();

	loginForm.addEventListener('submit', (evt: Event) => {
		evt.preventDefault();

		const email: string = emailInput.value;
		const password: string = passwordInput.value;

		setUser.logIn(email, password, authDomToggle);
		if (setUser.user) {
			loginForm.reset();
		}
	});

	registrationButton.addEventListener('click', (evt: Event) => {
		evt.preventDefault();

		const email: string = emailInput.value;
		const password: string = passwordInput.value;

		setUser.signUp(email, password, authDomToggle);
		if (setUser.user) {
			loginForm.reset();
		}
	});

	logOutButton.addEventListener('click', (evt: Event) => {
		evt.preventDefault();
		setUser.logOut(authDomToggle);
	});

	editButton.addEventListener('click', (evt: Event) => {
		evt.preventDefault();
		editBlock.classList.toggle('visible');
		userNameInput.value = setUser.user.displayName;
		userAvatarInput.value = setUser.user.photo || userAvatar.src;
	});

	editForm.addEventListener('submit', (evt: Event): void => {
		evt.preventDefault();
		const userNameValue: string = userNameInput.value;
		const userAvatarValue: string = userAvatarInput.value;
		setUser.editUser(userNameValue, userAvatarValue, authDomToggle);
		editBlock.classList.remove('visible');
	});
};

export {setUser};
export default user;
