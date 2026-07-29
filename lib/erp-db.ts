import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/src/generated/erp-client/client'

const connectionString = process.env.ERP_DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

const globalForErpDB = globalThis as unknown as {
    erpDb: PrismaClient | undefined
}

export const prisma =
    globalForErpDB.erpDb ??
    new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForErpDB.erpDb = prisma
