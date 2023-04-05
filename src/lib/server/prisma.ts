import { dev } from '$app/environment';
import { PrismaClient } from '@prisma/client';

export const prisma = globalThis.__prisma || new PrismaClient()

if (dev) globalThis.__prisma = prisma