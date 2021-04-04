// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { cache } from "./skill";

const Prisma = new PrismaClient();

export default async (req:NextApiRequest, res:NextApiResponse) => {

  const { name, all } = req.query;

  const cacheKey = `warlord-${name}`;
  if (cache.has(cacheKey)) {
    const result = cache.get(cacheKey);
    console.log({ cacheKey });
    console.log({ result });

    res.status(200).json(result);
    return ;
  }

  if (all && all === "true") {

    const allCacheKey = "warlord-all";

    const result = cache.has(allCacheKey)
      ? cache.get(allCacheKey)
      : await Prisma.warlord.findMany({
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
        }});

    !cache.has(allCacheKey) && cache.set(allCacheKey, result);
    res.status(200).json(result);
    return ;
  }

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

  cache.set(cacheKey, result);
  res.status(200).json(result);

};
