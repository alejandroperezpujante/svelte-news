import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { loginSchema } from './loginSchema';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db/connection';
import { eq, or } from 'drizzle-orm';
import { userTable } from '$lib/server/db/schema';
import { auth, passwordUtils } from '$lib/server/auth';

export async function load() {
	return {
		form: await superValidate(zod(loginSchema))
	};
}

export const actions = {
	default: async ({ locals, request, cookies }) => {
		if (locals.session || locals.user) redirect(302, '/');

		const form = await superValidate(request, zod(loginSchema));
		if (!form.valid) return fail(400, { form });

		const { identifier, password } = form.data;
		const user = await db.query.userTable.findFirst({
			where: or(eq(userTable.email, identifier), eq(userTable.username, identifier))
		});
		if (!user)
			return setError(form, 'identifier', 'User not found with the given email or username');
		if (!user.passwordHash) return setError(form, 'identifier', 'User has no password');

		const isPasswordValid = await passwordUtils.verify(user.passwordHash, password);
		if (!isPasswordValid) return setError(form, 'password', 'Invalid password');

		const session = await auth.createSession(user.id, {});
		const sessionCookie = auth.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '/',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
