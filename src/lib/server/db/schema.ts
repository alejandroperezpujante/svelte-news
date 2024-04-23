import { relations } from 'drizzle-orm';
import { pgTable, pgEnum, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

// TODO: Narrow down column types

export const userTable = pgTable('users', {
	id: text('id').primaryKey(),
	githubId: integer('github_id').unique('user_github_id_unique'),
	username: text('username').notNull().unique(),
	githubUsername: text('github_username').unique(),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash')
});
export const userRelations = relations(userTable, ({ many }) => ({
	sessions: many(sessionTable),
	posts: many(postTable)
}));

export const sessionTable = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});
export const sessionRelations = relations(sessionTable, ({ one }) => ({
	user: one(userTable, {
		fields: [sessionTable.userId],
		references: [userTable.id]
	})
}));

export const postType = pgEnum('post_type', [
	'uncategorized',
	'news',
	'discussion',
	'question',
	'job'
]);
export const postTable = pgTable('posts', {
	id: text('id').primaryKey().$defaultFn(nanoid),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	type: postType('type').notNull(),
	title: text('title').notNull(),
	body: text('body').notNull(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	})
		.notNull()
		.defaultNow()
});
export const postRelations = relations(postTable, ({ one, many }) => ({
	user: one(userTable, {
		fields: [postTable.userId],
		references: [userTable.id]
	}),
	comments: many(commentTable)
}));

export const commentTable = pgTable('comments', {
	id: text('id').primaryKey().$defaultFn(nanoid),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	postId: text('post_id')
		.notNull()
		.references(() => postTable.id),
	body: text('body').notNull(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});
export const commentRelations = relations(commentTable, ({ one, many }) => ({
	user: one(userTable, {
		fields: [commentTable.userId],
		references: [userTable.id]
	}),
	post: one(postTable, {
		fields: [commentTable.postId],
		references: [postTable.id]
	})
}));
