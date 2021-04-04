// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import skillDummy from "@utils/dummy/skillDummy";
import skillTypeDummy from "@utils/dummy/skillTypeDummy";
import warlordDummy from "@utils/dummy/warlordDummy";
import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";

const Prisma = new PrismaClient();
export const cache = new NodeCache();

export default async (req:NextApiRequest, res:NextApiResponse) => {
  // await skillTypeDummy();
  // await skillDummy();
  // await warlordDummy();

  const { q } = req.query;
  if (!q) {
    res.status(404).json("not found");
    return ;
  }
  if (Array.isArray(q)) {
    res.status(400).json("unexpected type");
    return;
  }

  const cacheKey = `query-${q}`;

  if (cache.has(cacheKey)) {
    console.log("has key ? ", cache.has(cacheKey));
    const queryCache = cache.get(cacheKey) as {warlord: {[key:string]:any}}[];
    res.status(200).json(queryCache.map(el => el.warlord));
    return ;
  }

  const queryItems:string[] = [];
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

  const or: ({name: {contains: string}} | {skill: {name: {contains: string}}} | {givenSkill: {name: {contains: string}}})[] = [];
  queryItems.forEach((query) => {
    or.push(
      { name: {
        contains: query,
      }},
      { skill: {
        name: {
          contains: query,
        },
      }},
      { givenSkill: {
        name: {
          contains: query,
        },
      }}
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
  }, [] as any).sort((a:{count:number}, b:{count:number}) => {
    return b.count - a.count;
  });

  cache.set(cacheKey, countingResult);

  res.status(200).json(countingResult.map((el:{warlord: {[key:string]:any}}) => el.warlord));

};
