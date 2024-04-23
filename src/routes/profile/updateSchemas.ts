import { emailSchema, passwordSchema, usernameSchema } from '$lib/validationSchemas';
import { z } from 'zod';

export const updateEmailSchema = z.object({
	email: emailSchema
});

export const updatePasswordSchema = z
	.object({
		currentPassword: passwordSchema,
		newPassword: passwordSchema,
		confirmNewPassword: passwordSchema
	})
	.refine((data) => data.currentPassword !== data.newPassword, {
		message: 'New password must be different from current password',
		path: ['newPassword']
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: 'Passwords do not match',
		path: ['confirmNewPassword']
	});

export const updateUsernameSchema = z.object({
	username: usernameSchema
});
