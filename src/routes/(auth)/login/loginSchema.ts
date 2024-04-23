import { passwordSchema } from '$lib/validationSchemas';
import { z } from 'zod';

export const loginSchema = z.object({
	identifier: z.string().min(5, 'Please enter your email or username'),
	password: passwordSchema
});
