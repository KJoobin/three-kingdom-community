// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const Prisma = new PrismaClient();

export default async (req:NextApiRequest, res:NextApiResponse) => {
  const { id } = req.query;

  if (!id) {
    res.status(404).json("not found");
    return ;
  }
  if (Array.isArray(id) || isNaN(Number(id))) {
    res.status(400).json("unexpected type");
    return;
  }

  const result = await Prisma.warlordCombine.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      Warlord: {
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
      },
    },
  });

  res.status(200).json(result);

};
