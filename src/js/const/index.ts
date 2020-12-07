type UserType = {
	email?: string,
	displayName: string,
	photoURL: string,
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

interface IPosts {
	allPosts: Array<PostType>;
	addPost: (
		this: IPosts,
		title: string,
		text: string,
		tags: string,
		author: {displayName: string, photoURL: string}
	) => void;
	getPosts: (handler: () => void) => void;
	postsListener: (handler: () => void) => void;
}

interface IUser {
	user: UserType | null;
	initUser: (this: IUser, handler: () => void) => void;
	getUser: (this: IUser, email: string) => UserType | undefined;
	authUser: (this: IUser, user: UserType) => void;
	logIn: (this: IUser, email: string, password: string) => void;
	logOut: (this: IUser) => void;
	signUp: (this: IUser, email: string, password: string, handler: () => void) => void;
	editUser: (this: IUser, userName: string, userAvatar: string, handler: () => void) => void;
}

export {UserType, PostType, IUser, IPosts};
