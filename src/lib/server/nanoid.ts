import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet(
	'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-',
	21
);

export { nanoid };
