/* eslint-disable prettier/prettier */
import argon2 from 'argon2';
import { Prisma } from '@prisma/client';
import prisma from '../prisma/client';

const userData: Prisma.UserCreateInput = {
  name: 'admin',
  email: 'admin@gmail.com',
  role: 'ADMIN',
  password: '123456',
  isActive: true
};

async function main(): Promise<void> {
  console.log('Start seeding ...');
  const password = await argon2.hash(userData.password);
  const data = {
    ...userData,
    password
  };

  const user = await prisma.user.create({ data });
  console.log(`Created user with id: ${user.id}`);
}

console.log('Seeding finished.');

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
