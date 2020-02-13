export const getCookie = (cookie, name) => {
	let value = '; ' + cookie;
	let parts = value.split('; ' + name + '=');
	if (parts.length === 2)
		return parts
			.pop()
			.split(';')
			.shift();
	if (parts.length > 2) return parts[parts.length - 1];
};

export const deleteCookie = name => {
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
