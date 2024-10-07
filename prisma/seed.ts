import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';
import { categoriesSeed, ingredientsSeed, productsSeed } from "./constants";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: number;
  size?: number;
}) => {
  return {
    productId,
    price: randomDecimalNumber(190, 600),
    pizzaType,
    size,
  };
};

async function up() {
  await prisma.user.createMany({
    data: [
      {
        email: 'admin@gmail.com',
        fullName: 'Admin',
        password: hashSync('Asdf1234!', 10),
        role: 'ADMIN',
        verified: new Date(),
      },
      {
        email: 'user@gmail.com',
        fullName: 'User',
        password: hashSync('Asdf1234!', 10),
        role: 'USER',
        verified: new Date(),
      },
    ],
  });

  await prisma.category.createMany({
    data: categoriesSeed,
  });
  await prisma.ingredient.createMany({
    data: ingredientsSeed,
  });

  const categoryIds = await prisma.category.findMany({
    select: { id: true },
  });

  const categoryIdArray = categoryIds.map(category => category.id);

  const defaultPrice = 100;
  // Assign random categoryId to products
  const productsWithCategoryIds = productsSeed.map(product => ({
    ...product,
    categoryId: categoryIdArray[Math.floor(Math.random() * categoryIdArray.length)],
    price: defaultPrice,
  }));

  await prisma.product.createMany({
    data: productsWithCategoryIds,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Pepperoni Fresh',
      imageUrl:
        'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
      categoryId: categoryIdArray[Math.floor(Math.random() * categoryIdArray.length)],
      price: 11,
      ingredients: {
        connect: ingredientsSeed.slice(0, 5),
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Cheese',
      imageUrl:
        'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
      categoryId: categoryIdArray[Math.floor(Math.random() * categoryIdArray.length)],
      price: 9,
      ingredients: {
        connect: ingredientsSeed.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Chorizo Fresh',
      imageUrl:
        'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
      categoryId: categoryIdArray[Math.floor(Math.random() * categoryIdArray.length)],
      price: 64,
      ingredients: {
        connect: ingredientsSeed.slice(10, 40),
      },
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
