import { redirect } from '@sveltejs/kit';

export async function load({ parent, locals }) {
	await parent();
	if (!locals.account) throw redirect(302, '/login');
}

export const actions = {};
