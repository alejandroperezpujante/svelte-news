import { redirect } from '@sveltejs/kit';
import { fail, message, superValidate, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { updateEmailSchema, updatePasswordSchema, updateUsernameSchema } from './updateSchemas';
import { db } from '$lib/server/db/connection';
import { sessionTable, userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { auth, passwordUtils } from '$lib/server/auth';

export async function load({ locals }) {
	if (!locals.session) redirect(302, '/login');

	return {
		updateForms: {
			email: await superValidate({ email: locals.user?.email }, zod(updateEmailSchema)),
			password: await superValidate(zod(updatePasswordSchema)),
			username: await superValidate({ username: locals.user?.username }, zod(updateUsernameSchema))
		},
		deleteForms: {}
	};
}

export const actions = {
	'update:email': async ({ locals, request }) => {
		if (!locals.user || !locals.session) return fail(401);

		const form = await superValidate(request, zod(updateEmailSchema));
		if (!form) return fail(400, { updateForms: { email: form } });
		const { email: newEmail } = form.data;

		const isCurrentEmail = locals.user?.email === newEmail;
		if (isCurrentEmail) return setError(form, 'email', 'Cannot update to the same email');

		const isEmailTaken = await db.query.userTable.findFirst({
			where: eq(userTable.email, newEmail)
		});
		if (isEmailTaken) return setError(form, 'email', 'Email is already in use');

		// TODO: Handle promise rejection
		await db.update(userTable).set({ email: newEmail }).where(eq(userTable.id, locals.user.id));

		// TODO: Send email verification
		return message(form, 'Email updated successfully');
	},
	'update:password': async ({ locals, request }) => {
		if (!locals.user || !locals.session) return fail(401);

		const form = await superValidate(request, zod(updatePasswordSchema));
		if (!form) return fail(400, { updateForms: { password: form } });
		const { currentPassword: providedCurrentPassword, newPassword } = form.data;

		const userWithPassword = await db.query.userTable.findFirst({
			columns: { passwordHash: true },
			where: eq(userTable.id, locals.user.id)
		});
		if (!userWithPassword?.passwordHash) return fail(500);

		const isPasswordValid = await passwordUtils.verify(
			providedCurrentPassword,
			userWithPassword.passwordHash
		);
		if (!isPasswordValid) return setError(form, 'currentPassword', 'Incorrect password');

		const newPasswordHash = await passwordUtils.hash(newPassword);
		await db
			.update(userTable)
			.set({ passwordHash: newPasswordHash })
			.where(eq(userTable.id, locals.user.id));

		return message(form, 'Password updated successfully');
	},
	'update:username': async ({ locals, request }) => {
		if (!locals.user || !locals.session) return fail(401);

		const form = await superValidate(request, zod(updateUsernameSchema));
		if (!form) return fail(400, { updateForms: { username: form } });
		const { username: newUsername } = form.data;

		const isCurrentUsername = locals.user?.username === newUsername;
		if (isCurrentUsername) return setError(form, 'username', 'Cannot update to the same username');

		const isUsernameTaken = await db.query.userTable.findFirst({
			where: eq(userTable.username, newUsername)
		});
		if (isUsernameTaken) return setError(form, 'username', 'Username is already in use');

		// TODO: Handle promise rejection
		await db
			.update(userTable)
			.set({ username: newUsername })
			.where(eq(userTable.id, locals.user.id));

		return message(form, 'Username updated successfully');
	},

	'delete:sessions': async ({ locals, cookies }) => {
		if (!locals.user || !locals.session) return fail(401);

		await auth.invalidateUserSessions(locals.user.id);
		const sessionCookie = auth.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(302, '/');
	},
	'delete:oauth': async ({ locals, cookies }) => {
		if (!locals.user || !locals.session) return fail(401);

		await db
			.update(userTable)
			.set({ githubId: null, githubUsername: null })
			.where(eq(userTable.id, locals.user.id));

		await auth.invalidateUserSessions(locals.user.id);
		const sessionCookie = auth.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(302, '/');
	},
	'delete:account': async ({ locals, cookies }) => {
		if (!locals.user || !locals.session) return fail(401);

		await db.delete(userTable).where(eq(userTable.id, locals.user.id));
		await db.delete(sessionTable).where(eq(sessionTable.userId, locals.user.id));

		const sessionCookie = auth.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(302, '/');
	}
};
