/*
  Warnings:

  - You are about to drop the column `warloadId` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `givenWarloadId` on the `Skill` table. All the data in the column will be lost.
  - Added the required column `skillId` to the `Warlord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `givenSkillId` to the `Warlord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Skill` DROP FOREIGN KEY `Skill_ibfk_3`;

-- DropForeignKey
ALTER TABLE `Skill` DROP FOREIGN KEY `Skill_ibfk_2`;

-- AlterTable
ALTER TABLE `Skill` DROP COLUMN `warloadId`,
    DROP COLUMN `givenWarloadId`;

-- AlterTable
ALTER TABLE `Warlord` ADD COLUMN     `skillId` INTEGER NOT NULL,
    ADD COLUMN     `givenSkillId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Warlord` ADD FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Warlord` ADD FOREIGN KEY (`givenSkillId`) REFERENCES `Skill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
