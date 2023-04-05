import { redirect, fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { nanoid } from '$lib/server/nanoid';

export async function load({ parent, locals }) {
	await parent();
	if (!locals.account) throw redirect(302, '/login');
}

export const actions = {
	default: async ({ request, locals }) => {
		const accountId = locals.account?.id;
		if (!accountId) return fail(401, { error: true, message: 'Unauthorized' });

		const { title, link, description } = Object.fromEntries(await request.formData()) as {
			title: string;
			link: string;
			description: string;
		};
		if (!title) return fail(400, { error: true, message: 'Missing title' });

		if (!link && description) return fail(400, { error: true, message: 'Missing link' });

		const newPost = await prisma.post.create({
			data: {
				id: nanoid(),
				accountId,
				title,
				category: inferCategoryFromTitle(title),
				link,
				description
			}
		});

		return {
			success: true,
			category: newPost.category,
			postId: newPost.id
		};
	}
};

function inferCategoryFromTitle(title: string) {
	if (title.toLowerCase().includes('ask sn:')) return 'ask';
	if (title.toLowerCase().includes('show sn:')) return 'show';
	if (title.toLowerCase().includes('job sn:')) return 'job';
	return 'article';
}
