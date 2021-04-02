// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const Prisma = new PrismaClient();

export default async (req:NextApiRequest, res:NextApiResponse) => {

  const { name } = req.query;

  if (!name) {
    res.status(404).json("not found");
    return ;
  }
  if (Array.isArray(name)) {
    res.status(400).json("unexpected type");
    return;
  }

  const result = await Prisma.warlord.findFirst({
    where: {
      name,
    },
    include: {
      skill: {
        include: {
          Type: true,
        },
      },
      givenSkill: {
        include: {
          Type: true,
        },
      },
    },
  });

  console.log({ result });

  res.status(200).json(result);

};
