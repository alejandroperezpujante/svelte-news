import { prisma } from '$lib/server/prisma.js';
import { error, fail } from '@sveltejs/kit';
import { nanoid } from '$lib/server/nanoid.js';

export async function load({ params }) {
	const post = await prisma.post.findUnique({
		where: { id: params.id },
		include: {
			comments: {
				include: { account: { select: { username: true } } }
			}
		}
	});
	if (!post) throw error(404, 'Post not found');
	return { post };
}

export const actions = {
	comment: async ({ request, locals }) => {
		if (!locals.account) return fail(401, { error: true, message: 'Unauthorized' });
		const { comment, postId } = Object.fromEntries(await request.formData()) as {
			comment: string;
			postId: string;
		};

		if (!comment) return fail(400, { error: true, message: 'Comment cannot be empty' });
		if (!postId) return fail(400, { error: true, message: 'Post ID is required' });

		await prisma.comment.create({
			data: {
				id: nanoid(),
				content: comment,
				accountId: locals.account.id,
				postId
			}
		});

		return { success: true };
	}
};
