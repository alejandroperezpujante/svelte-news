import { prisma } from '$lib/server/prisma';

export async function handle({ event, resolve }) {
	const cookie = event.cookies.get('sn_session');
	if (!cookie) {
		event.locals.account = null;
		return resolve(event);
	}

	const session = await prisma.session.findUnique({
		where: { id: cookie },
		include: { account: true }
	});
	if (!session) {
		event.locals.account = null;
		return resolve(event);
	}

	if (session.expiresAt < new Date()) {
		await prisma.session.delete({ where: { id: session.id } });
		event.cookies.delete('sn_session');
		event.locals.account = null;
		return Response.redirect('/login?reason=expired');
	}

	event.locals.account = {
		id: session.account.id,
		email: session.account.email,
		username: session.account.username
	};

	return resolve(event);
}
