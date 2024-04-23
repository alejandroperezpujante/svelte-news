import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { loginSchema } from './loginSchema';

export async function load() {
	return {
		form: await superValidate(zod(loginSchema))
	};
}

export const actions = {
	default: async () => {}
};
