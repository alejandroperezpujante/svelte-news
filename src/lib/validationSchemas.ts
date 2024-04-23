import { z } from 'zod';

export const emailSchema = z
	.string()
	.min(1, 'Please enter your email address')
	.email('Email must be a valid email address');

export const usernameSchema = z
	.string()
	.min(5, 'Please enter your username')
	.max(35, 'Username must be at most 35 characters');

export const passwordSchema = z
	.string()
	.min(1, 'Please enter your password')
	.min(8, 'Password must be at least 8 characters long')
	.max(48, 'Password must be at most 48 characters long');
