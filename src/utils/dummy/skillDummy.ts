// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { skillData } from "@utils/skill-data";
import { warlordSkillData } from "@utils/warlord-skill-data";

const Prisma = new PrismaClient();

/*
*   export type SkillCreateManyInput = {
    id?: number
    name: string
    desc: string
    picture?: string | null
    rank: string
    target: string
    percentage: number
    skillTypeId: number
    createdAt?: Date | string
  }
* */

export default async () => {
  for (const { type, ...workloadSkill } of skillData) {
    console.log({ type });
    const skillType = await Prisma.skillType.findFirst({ where: {
      name: type,
    }});
    if (skillType) {
      const skillTypeId = skillType.id;
      console.log({ skillTypeId });
      const create = await Prisma.skill.create({
        data: {
          ...workloadSkill,
          skillTypeId,
        },
      });
      console.log({ create });
    }
  }
};
