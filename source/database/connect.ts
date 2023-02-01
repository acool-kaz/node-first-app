import { PrismaClient } from 'prisma/prisma-client'

const client = new PrismaClient();

async function connectDB() {
    await client.$connect()
}

export default { connectDB, client }