import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { nanoid } from '$lib/server/nanoid';
import { SessionCookieOptions } from '$lib/server/sessionCookieOptions';

export async function load({ parent, locals, url }) {
	await parent();
	if (locals.account) throw redirect(302, '/');

	const reason = url.searchParams.get('reason');
	if (reason == null) return;
	return {
		reason: inferRedirectReason(reason)
	};
}

function inferRedirectReason(reason: string) {
	switch (reason) {
		case 'expired':
			return 'Your session has expired. Please log in again.';
		default:
			return 'Please log in to continue.';
	}
}

export const actions = {
	default: async ({ request, cookies }) => {
		const { email, password } = Object.fromEntries(await request.formData()) as {
			email: string;
			password: string;
		};
		if (!email || !password) return fail(400, { message: 'Missing email or password' });

		const user = await prisma.account.findUnique({ where: { email } });
		if (!user) return fail(400, { message: 'Invalid email' });

		const session = await prisma.session.create({
			data: {
				id: nanoid(),
				accountId: user.id,
				expiresAt: new Date(Date.now() + 1000 * 60 * 60) // 1 hour
			}
		});
		cookies.set('sn_session', session.id, SessionCookieOptions);

		throw redirect(302, '/');
	}
};
