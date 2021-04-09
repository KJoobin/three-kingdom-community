// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import { seasonTwoWarlordSkillData, warlordSkillData } from "@utils/warlord-skill-data";

const Prisma = new PrismaClient();

/*
model warlord {
  id          Int       @id @default(autoincrement())
  name  String @unique
  picture String?
  rank String
  skill   Skill? @relation("skill")
    givenSkill  Skill?   @relation("givenSkill")
    createdAt   DateTime  @default(now())
}
* */

export default async () => {
  for (const { skill, givenSkill, ...warlord } of seasonTwoWarlordSkillData) {

    const findSkill = await Prisma.skill.findFirst({ where: {
      name: skill,
    }});

    const findGivenSkill = await Prisma.skill.findFirst({ where: {
      name: givenSkill,
    }});

    if (findSkill && findSkill.id && findGivenSkill) {
      try {
        const create = await Prisma.warlord.create({
          data: {
            ...warlord,
            skillId: findSkill.id,
            givenSkillId: findGivenSkill.id,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
