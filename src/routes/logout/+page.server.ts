import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

export async function load({ parent, locals }) {
	await parent();
	if (!locals.account) throw redirect(302, '/login');
}

export const actions = {
	current: async ({ locals, cookies }) => {
		const token = cookies.get('sn_session');
		await prisma.session.delete({ where: { id: token } });
		cookies.delete('sn_session');
		locals.account = null;
		throw redirect(302, '/login');
	},
	all: async ({ locals, cookies }) => {
		await prisma.session.deleteMany({ where: { accountId: locals.account?.id } });
		cookies.delete('sn_session');
		locals.account = null;
		throw redirect(302, '/login');
	}
};
