// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import skillDummy from "@utils/dummy/skillDummy";
import skillTypeDummy from "@utils/dummy/skillTypeDummy";
import warlordDummy from "@utils/dummy/warlordDummy";
import { NextApiRequest, NextApiResponse } from "next";

const Prisma = new PrismaClient();

export default async (req:NextApiRequest, res:NextApiResponse) => {
  // await skillTypeDummy();
  // await skillDummy();
  // await warlordDummy();

  const { q } = req.query;
  if (!q || Array.isArray(q)) {
    res.status(404).json("not found");
    return ;
  }
  if (Array.isArray(q)) {
    res.status(400).json("unexpected type");
    return;
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

  // const skill = await Prisma.skill.findMany();
  // const type = await Prisma.skillType.findMany();
  // const warlord = await Prisma.warlord.findMany();

  console.log({ result });

  // const result = warlordSkillData.map((warlordData) => {
  //   let count = 0;
  //   queryItems.forEach((searchQ) => {
  //     Object.entries(warlordData).find(([key, data]) => {
  //       if (typeof data === "string") {
  //         return data.includes(searchQ);
  //       }
  //       if (Array.isArray(data)) {
  //         return !!data.find(warlord => warlord === searchQ);
  //       }
  //       return false;
  //     }) && count++;
  //   });
  //   return { data: warlordData, count };
  //
  // }).filter(el => el.count > 0)
  //   .sort((a, b) => {
  //     if (a.count > b.count) {
  //       return -1;
  //     }
  //     if (a.count === b.count) {
  //       return 0;
  //     }
  //     return 1;
  //   });

  res.status(200).json(result);

};
