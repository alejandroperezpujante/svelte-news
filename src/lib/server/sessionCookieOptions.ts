import type { Cookies } from '@sveltejs/kit';
import { dev } from '$app/environment';

export const SessionCookieOptions: Parameters<Cookies['set']>[2] = {
	path: '/',
	httpOnly: true,
	sameSite: 'lax',
	maxAge: 60 * 60, // 1 hour
	expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
	secure: !dev
};
