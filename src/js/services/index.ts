const getDisplayName = (email: string): string => {
	const displayName = email.split('@')[0];
	return displayName;
};

export {getDisplayName};
