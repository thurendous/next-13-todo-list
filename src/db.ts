// The way next js wroks in a dev mode is different. It does hot reloading.
// hot reloading is the feature of next js. and it reruns the node and makes things faster fro us.
// but it can constanly create new connections to the prisma client and makes performace worse.
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
