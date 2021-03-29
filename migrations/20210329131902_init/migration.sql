/*
  Warnings:

  - Added the required column `typeId` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Skill` ADD COLUMN     `typeId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `SkillType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Skill` ADD FOREIGN KEY (`typeId`) REFERENCES `SkillType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
