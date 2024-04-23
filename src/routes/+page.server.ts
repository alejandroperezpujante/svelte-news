import { auth } from '$lib/server/auth.js';
import { db } from '$lib/server/db/connection.js';
import { postTable } from '$lib/server/db/schema.js';
import { fail, redirect } from '@sveltejs/kit';
import { desc, sql } from 'drizzle-orm';

export async function load() {
	const fetchRecentPosts = db.query.postTable.findMany({
		columns: {
			id: true,
			title: true,
			userId: true,
			createdAt: true
		},
		orderBy: [desc(postTable.createdAt)],
		extras: {
			clampedBody: sql<string>`substring(${postTable.body}, 1, 100)`.as('clampedBody')
		},
		limit: 10
	});

	return {
		recentPosts: await fetchRecentPosts
	};
}

export const actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}

		await auth.invalidateSession(event.locals.session.id);
		const sessionCookie = auth.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
