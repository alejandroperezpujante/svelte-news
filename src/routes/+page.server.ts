import { prisma } from '$lib/server/prisma';

export function load() {
	return {
		news: prisma.post.findMany({
			select: {
				id: true,
				category: true,
				title: true,
				link: true,
				_count: { select: { upvotes: true, comments: true } }
			},
			take: 25,
			orderBy: { createdAt: 'desc' }
		})
	};
}
