import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log("Seeding database...");

    // Create Categories
    const categories = await Promise.all(
      Array.from({ length: 5 }).map(() =>
        prisma.category.create({
          data: {
            name: faker.commerce.department(),
          },
        })
      )
    );

    // Create Products with Images
    for (let i = 0; i < 50; i++) {
      const category = faker.helpers.arrayElement(categories);
      await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price()),
          stock: faker.number.int({ min: 1, max: 100 }), // ✅ Fixed Here
          categoryId: category.id,
          images: {
            create: Array.from({ length: 3 }).map(() => ({
              url: faker.image.url(),
            })),
          },
        },
      });
    }

    console.log("Seeding completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

export default seed;
