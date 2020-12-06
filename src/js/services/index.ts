const getDisplayName = (email: string): string => {
	const displayName = email.split('@')[0];
	return displayName;
};

const addVisibleClass = (...args: (HTMLAnchorElement | HTMLDivElement)[]): void => {
	args.map((item) => item.classList.add('visible'));
};
const removeVisibleClass = (...args: (HTMLAnchorElement | HTMLDivElement)[]): void => {
	args.map((item) => item.classList.remove('visible'));
};

export {getDisplayName, addVisibleClass, removeVisibleClass};
