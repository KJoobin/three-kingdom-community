// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient();

export default async () => {
  await Prisma.skillType.createMany({
    data: [
      { name: "지휘" },
      { name: "액티브" },
      { name: "돌격" },
      { name: "패시브" },
      { name: "생존" },
      { name: "병종" },
      { name: "전법" },
      { name: "내정" },
    ],
  });
};
