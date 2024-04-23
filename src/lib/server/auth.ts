import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from '$lib/server/db/connection';
import { sessionTable, userTable } from '$lib/server/db/schema';
import { GitHub } from 'arctic';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { Argon2id } from 'oslo/password';

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);
export const auth = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => ({
		email: attributes.email,
		username: attributes.username,

		githubId: attributes.githubId,
		githubUsername: attributes.githubUsername
	})
});

const argon2id = new Argon2id();
export const passwordUtils = {
	hash: argon2id.hash.bind(argon2id),
	verify: argon2id.verify.bind(argon2id)
};

export const oauthGithub = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);

type DatabaseUserAttributes = {
	email: string;
	username: string;

	githubId?: number;
	githubUsername?: string;
};

declare module 'lucia' {
	interface Register {
		Lucia: typeof auth;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}
