import { redirect } from '@sveltejs/kit';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { submitSchema } from './submitSchema';
import { db } from '$lib/server/db/connection';
import { postTable } from '$lib/server/db/schema';

export async function load({ locals }) {
	if (!locals.user || !locals.session) redirect(302, '/login');

	return {
		form: await superValidate(zod(submitSchema))
	};
}

export const actions = {
	default: async ({ locals, request }) => {
		if (!locals.user || !locals.session) return fail(401);

		const form = await superValidate(request, zod(submitSchema));
		if (!form.valid) return fail(400, { form });

		const { type, title, body } = form.data;
		await db.insert(postTable).values({
			userId: locals.user.id,
			type,
			title,
			body
		});

		return message(form, 'Post submitted successfully');
	}
};
