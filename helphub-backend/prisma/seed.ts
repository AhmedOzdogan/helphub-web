import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    const hashedPassword = await bcrypt.hash(
        process.env.testPassword || '123456',
        10
    );

    await prisma.user.upsert({
        where: {
            email: process.env.testUsername || 'ahmed123@gmail.com',
        },
        update: {},
        create: {
            email: process.env.testUsername || 'ahmed123@gmail.com',
            password: hashedPassword,
        },
    });

    console.log('Seed completed');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });