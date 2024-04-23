import { z } from 'zod';

export const loginSchema = z.object({
	identifier: z.string().min(1, 'Please enter your email or username'),
	password: z
		.string()
		.min(1, 'Please enter your password')
		.min(8, 'Password must be at least 8 characters long')
		.max(48, 'Password must be at most 48 characters long')
});
