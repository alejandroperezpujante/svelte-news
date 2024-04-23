import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { registerSchema } from './registerSchema';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db/connection';
import { eq } from 'drizzle-orm';
import { userTable } from '$lib/server/db/schema';
import { generateId } from 'lucia';
import { auth, passwordUtils } from '$lib/server/auth';

export async function load() {
	return {
		form: await superValidate(zod(registerSchema))
	};
}

export const actions = {
	default: async ({ locals, request, cookies }) => {
		if (locals.session || locals.user) redirect(302, '/');

		const form = await superValidate(request, zod(registerSchema));
		if (!form.valid) return fail(400, { form });
		const { email, username, password } = form.data;

		// TODO: Two query are redundant, simplify this
		const existingUserByEmail = await db.query.userTable.findFirst({
			where: eq(userTable.email, email)
		});
		if (existingUserByEmail) return setError(form, 'email', 'Email or username already in use');

		const existingUserByUsername = await db.query.userTable.findFirst({
			where: eq(userTable.username, username)
		});
		if (existingUserByUsername)
			return setError(form, 'username', 'Email or username already in use');

		const userId = generateId(15);
		const passwordHash = await passwordUtils.hash(password);

		// TODO: Handle error
		await db.insert(userTable).values({
			id: userId,
			email,
			username,
			passwordHash
		});

		const session = await auth.createSession(userId, {});
		const sessionCookie = auth.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '/',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
