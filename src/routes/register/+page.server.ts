import { redirect, fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import argon2 from 'argon2';
import { SessionCookieOptions } from '$lib/server/sessionCookieOptions';
import { nanoid } from '$lib/server/nanoid';

export async function load({ parent, locals }) {
	await parent();
	if (locals.account) throw redirect(302, '/');
}

export const actions = {
	default: async ({ request, cookies }) => {
		const { email, username, password } = Object.fromEntries(await request.formData()) as {
			email: string;
			username: string;
			password: string;
		};

		if (!email || !username || !password)
			return fail(400, { message: 'Missing email, username or password' });

		const account = await prisma.account.create({
			data: {
				id: nanoid(),
				email,
				username,
				passwordHash: await argon2.hash(password),
				sessions: { create: { id: nanoid(), expiresAt: new Date(Date.now() + 1000 * 60 * 60) } }
			},
			include: { sessions: true }
		});

		cookies.set('sn_session', account.sessions[0].id, SessionCookieOptions);

		throw redirect(302, '/');
	}
};
