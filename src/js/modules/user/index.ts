import {users, UserType} from '../../const';
import {getDisplayName} from '../../services/';

interface IUser {
    user: UserType | null,
    getUser: (this: IUser, email: string, password?: string) => UserType | undefined,
    authUser: (this: IUser, user: UserType) => void,
    logIn: (this: IUser, email: string, password: string, handler: () => void) => void
    logOut: (this:IUser) => void,
    signUp: (this:IUser, email: string, password: string, handler: () => void) => void
  }

const user = (): void => {
  const loginBlock: HTMLDivElement = document.querySelector('.login');
  const loginForm:HTMLFormElement = document.querySelector('.login-form');
  const emailInput: HTMLInputElement = document.querySelector('.login-email')
  const passwordInput: HTMLInputElement = document.querySelector('.login-password')
  const registrationButton: HTMLAnchorElement = document.querySelector('.login-sign-in')

  const userBlock:HTMLDivElement = document.querySelector('.user');
  const userName = document.querySelector('.user-name');

  const setUser: IUser = {
    user: null,
    logIn(email, password, handler){
      const user:UserType | undefined = this.getUser(email, password);
      if(!user) {
        alert('Пользователь с такими данными не найден')
      } else if(user) {
        this.authUser(user)
        loginForm.reset();
        handler();
      }
    },
    logOut(){},
    signUp(email, password, handler){
      const user = this.getUser(email);
      if(user) {
        alert('Данная почта уже используется');
      } else if(!user) {
        const newUser = {email, password, displayName: getDisplayName(email)}
        users.push(newUser);
        this.authUser(newUser);
        handler()
      }
    },

    getUser(email, password){
      const user = users.find((item) => item.email === email && item.password === password)
      return user
    },

    authUser(user){
      this.user = user;
    }
  }

  const authDomToggle = () => {
    const user: UserType | null = setUser.user;
    if(user) {
      userName.textContent = user.displayName;
      loginBlock.style.display = 'none';
      userBlock.style.display = 'flex';
    } else {
      loginBlock.style.display = '';
      userBlock.style.display = '';
    }
  }

  authDomToggle()

  loginForm.addEventListener('submit', (evt:Event) => {
    evt.preventDefault();

    const email:string = emailInput.value;
    const password:string = passwordInput.value;

    setUser.logIn(email, password, authDomToggle)
  })

  registrationButton.addEventListener('click', (evt: Event) => {
    evt.preventDefault();

    const email:string = emailInput.value;
    const password:string = passwordInput.value;

    setUser.signUp(email, password, authDomToggle);
  })

  console.log(getDisplayName("test1@mail.com"));
}

export default user
