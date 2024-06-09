/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from '@prisma/client';
import {faker} from '@faker-js/faker';
const prisma = new PrismaClient();

async function main() {
    // Generate 100 categories
    for (let i = 0; i < 100; i++) {
      await prisma.category.create({
        data: {
          name: faker.commerce.department(),
        },
      });
    }
  
    console.log("100 categories have been created.");
  }
  
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });