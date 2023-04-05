import { prisma } from '$lib/server/prisma';

export function load() {
	return {
		posts: prisma.post.findMany({
			where: { category: 'article' },
			orderBy: { createdAt: 'desc' },
			take: 10
		})
	};
}
