export function load({ locals }) {
	const isAuthenticated = locals.session !== null && locals.user !== null;

	return {
		isAuthenticated,
		user: locals.user,
		session: locals.session
	};
}
