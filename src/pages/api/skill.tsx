// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";

const Prisma = new PrismaClient();
export const cache = new NodeCache();

export default async (req:NextApiRequest, res:NextApiResponse) => {
  // await skillTypeDummy();
  // await skillDummy();
  // await warlordDummy();

  const { q, all } = req.query;
  const cacheKey = `query-${q}`;

  if (req.method === "PUT") {
    const { skill, givenSkill, ...warlord } = req.body;
    if (warlord) {
      await Prisma.warlord.update({
        where: {
          id: warlord.id,
        },
        data: warlord,
      });

      if (skill) {
        const { Type, ...restSkill } = skill;

        await Prisma.skill.update({
          where: {
            id: restSkill.id,
          },
          data: restSkill,
        });
      }

      if (givenSkill) {
        const { Type, ...restSkill } = givenSkill;

        await Prisma.skill.update({
          where: {
            id: restSkill.id,
          },
          data: restSkill,
        });
      }

      cache.del(cacheKey);

      res.status(200).json({ result: true });
    }

  } else {

    if (all && process.env.NODE_ENV === "development") {
      const result = await Prisma.warlord.findMany({
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
      res.status(200).json(result);
      return;
    }
    if (!q) {
      res.status(404).json("not found");
      return;
    }
    if (Array.isArray(q)) {
      res.status(400).json("unexpected type");
      return;
    }

    if (cache.has(cacheKey)) {
      const queryCache = cache.get(cacheKey) as { warlord: { [key: string]: any } }[];
      res.status(200).json(queryCache.map(el => el.warlord));
      return;
    }

    const queryItems: string[] = [];
    const splitSpaceQ = q === q.split(" ").join("") ? q.split("") : q.split(" ");
    const { length } = splitSpaceQ;

    for (let i = 0; i++ <= length;) {
      for (let j = -1; j++ < length;) {
        // i = how many join split q;
        // j = array index;
        if (j + i <= length) {
          const sliceNumOfQ = splitSpaceQ.slice(j, j + i);
          if (sliceNumOfQ.length > 1) {
            const joinWithSpace = sliceNumOfQ.join(" ");
            const joinWithoutSpace = sliceNumOfQ.join("");
            queryItems.push(joinWithSpace);
            if (joinWithoutSpace !== joinWithSpace) {
              queryItems.push(joinWithoutSpace);
            }
          }
        }
      }
    }

    const or: ({ name: { contains: string } } | { skill: { name: { contains: string } } } | { givenSkill: { name: { contains: string } } })[] = [];
    queryItems.forEach((query) => {
      or.push(
        {
          name: {
            contains: query,
          },
        },
        {
          skill: {
            name: {
              contains: query,
            },
          },
        },
        {
          givenSkill: {
            name: {
              contains: query,
            },
          },
        }
      );
    });

    const result = await Prisma.warlord.findMany({
      where: {
        OR: or,
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

    const countingResult = result.reduce((acc, warlord) => {
      let count = 0;
      queryItems.forEach((el) => {
        if (warlord.name.includes(el)) {
          ++count;
        }
        if (warlord.skill.name.includes(el)) {
          ++count;
        }
      });
      acc.push({ warlord, count });
      return acc;
    }, [] as any).sort((a: { count: number }, b: { count: number }) => {
      return b.count - a.count;
    });

    cache.set(cacheKey, countingResult);

    res.status(200).json(countingResult.map((el: { warlord: { [key: string]: any } }) => el.warlord));
  }
};
