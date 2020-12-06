const getDisplayName = (email: string): string => {
	const displayName = email.split('@')[0];
	return displayName;
};

const tagsCreator = (string: string): Array<string> => string.split(',').map((item) => item.trim());

const addVisibleClass = (...args: HTMLElement[]): void => {
	args.map((item) => item.classList.add('visible'));
};
const removeVisibleClass = (...args: HTMLElement[]): void => {
	args.map((item) => item.classList.remove('visible'));
};

export {getDisplayName, addVisibleClass, removeVisibleClass, tagsCreator};
