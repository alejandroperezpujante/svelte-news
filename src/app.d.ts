// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			account?: {
				id: string;
				email: string;
				username: string;
			} | null;
		}
		// interface PageData {}
		// interface Platform {}
	}

	// eslint-disable-next-line no-var
	var __prisma: import('@prisma/client').PrismaClient | undefined;
}

export {};
