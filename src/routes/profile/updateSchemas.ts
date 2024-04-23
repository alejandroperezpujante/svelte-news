import { z } from 'zod';

export const updateEmailSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Email must be a valid email address')
});

const passwordSchema = z
	.string()
	.min(1, 'Password is required')
	.min(8, 'Password must be at least 8 characters')
	.max(48, 'Password must be at most 48 characters');
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
	username: z.string().min(1, 'Username is required').max(35, 'Username must be at 35 characters')
});
