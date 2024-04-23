import { emailSchema, passwordSchema, usernameSchema } from '$lib/validationSchemas';
import { z } from 'zod';

export const registerSchema = z.object({
	email: emailSchema,
	username: usernameSchema,
	password: passwordSchema,
	confirmPassword: passwordSchema
});
