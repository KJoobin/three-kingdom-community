/*
  Warnings:

  - You are about to drop the column `typeId` on the `Skill` table. All the data in the column will be lost.
  - Added the required column `skillTypeId` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Skill` DROP FOREIGN KEY `Skill_ibfk_1`;

-- AlterTable
ALTER TABLE `Skill` DROP COLUMN `typeId`,
    ADD COLUMN     `skillTypeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Skill` ADD FOREIGN KEY (`skillTypeId`) REFERENCES `SkillType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
