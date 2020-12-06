type UserType = {
	email: string,
	password: string,
	displayName: string,
	photo: string,
};

type PostType = {
	title: string,
	text: string,
	tags: Array<string>,
	likes: number,
	comments: number,
	date: string,
	author: UserType,
};

const users: Array<UserType> = [
	{
		email: 'test1@mail.com',
		password: '1234',
		displayName: 'Max',
		photo: './assets/img/avatar.jpeg',
	},
	{
		email: 'test2@mail.com',
		password: '12345',
		displayName: 'Cat',
		photo: './assets/img/avatar.jpeg',
	},
	{
		email: 'tes3@mail.com',
		password: '123456',
		displayName: 'Lime',
		photo: './assets/img/avatar.jpeg',
	},
];

const posts: Array<PostType> = [
	{
		author: {
			email: 'test1@mail.com',
			password: '1234',
			displayName: 'Max',
			photo: './assets/img/avatar.jpeg',
		},
		date: '11.11.2011',
		title: 'Заголовок 1',
		text:
			'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит! ',
		tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
		likes: 15,
		comments: 5,
	},
	{
		author: {
			email: 'test1@mail.com',
			password: '1234',
			displayName: 'Max',
			photo: './assets/img/avatar.jpeg',
		},
		date: '11.11.2015',
		title: 'Заголовок 2',
		text:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta non iusto laborum quidem ab consequuntur eveniet minus, obcaecati adipisci ullam reiciendis, excepturi id pariatur, quia perspiciatis corrupti neque debitis explicabo eum modi magni! Adipisci laudantium, quaerat saepe officia iusto tempora, quisquam tenetur, enim veniam aspernatur sit mollitia beatae? Ullam inventore rem iusto in rerum qui eius temporibus dolor, accusamus voluptatibus?',
		tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
		likes: 45,
		comments: 15,
	},
	{
		author: {
			email: 'test1@mail.com',
			password: '1234',
			displayName: 'Max',
			photo: './assets/img/avatar.jpeg',
		},
		date: '11.11.2020',
		title: 'Заголовок 3',
		text:
			'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит! ',
		tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
		likes: 15,
		comments: 5,
	},
];

const mailRegExp: RegExp = /^\w+@\w+\.\w{2,}$/;

export {users, UserType, mailRegExp, posts, PostType};
