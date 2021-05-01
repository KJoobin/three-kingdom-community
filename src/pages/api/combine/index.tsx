// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const Prisma = new PrismaClient();

export default async (req:NextApiRequest, res:NextApiResponse) => {

  if (req.method === "POST") {
    const data = req.body;

    if (!data) {
      res.status(404).json("not found");
      return ;
    }
    if (!Array.isArray(data)) {
      res.status(400).json("unexpected type");
      return;
    }

    const result = await Prisma.warlordCombine.create({
      data: {
        Warlord: {
          connect: [
            ...(data.map(warlord => ({
              id: warlord.id,
            }))),
          ],
        },
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
    return ;

  } else {
    res.status(404);
  }

  // const result = await Prisma.warlord.findFirst({
  //   where: {
  //     name,
  //   },
  //   include: {
  //     skill: {
  //       include: {
  //         Type: true,
  //       },
  //     },
  //     givenSkill: {
  //       include: {
  //         Type: true,
  //       },
  //     },
  //   },
  // });

  // res.status(200).json("GOOODS");

};
