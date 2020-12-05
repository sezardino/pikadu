type UserType = {
  email: string,
  password: string,
  displayName: string,
  photo?: string,
}

const users: Array<UserType> = [
	{email: 'test1@mail.com', password: '1234', displayName: 'Max'},
	{email: 'test2@mail.com', password: '12345', displayName: 'Cat'},
	{email: 'tes3@mail.com', password: '123456', displayName: 'Lime'},
];

const mailRegExp:RegExp = /^\w+@\w+\.\w{2,}$/

export {users, UserType, mailRegExp};
