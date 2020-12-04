type UserType = {
  email: string,
  password: string,
  displayName: string,
}

const users: Array<UserType> = [
	{email: 'test1@mail.com', password: '1234', displayName: 'Max'},
	{email: 'test2@mail.com', password: '12345', displayName: 'Cat'},
	{email: 'tes3@mail.com', password: '123456', displayName: 'Lime'},
];

export {users, UserType};
