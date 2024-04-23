import { z } from 'zod';

export const submitSchema = z.object({
	type: z.enum(['uncategorized', 'news', 'discussion', 'question', 'job']),
	title: z
		.string()
		.min(5, 'Title must be at least 5 characters long')
		.max(50, 'Title must be at most 50 characters long'),
	body: z
		.string()
		.min(20, 'Body must be at least 20 characters long')
		.max(1000, 'Body must be at most 1000 characters long')
});
