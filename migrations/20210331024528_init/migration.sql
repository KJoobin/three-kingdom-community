/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[warloadId]` on the table `Skill`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE `Skill` ADD COLUMN     `warloadId` INTEGER,
    ADD COLUMN     `givenWarloadId` INTEGER;

-- CreateTable
CREATE TABLE `Warlord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `picture` VARCHAR(191),
    `rank` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
UNIQUE INDEX `Warlord.name_unique`(`name`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Skill_warloadId_unique` ON `Skill`(`warloadId`);

-- AddForeignKey
ALTER TABLE `Skill` ADD FOREIGN KEY (`warloadId`) REFERENCES `Warlord`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Skill` ADD FOREIGN KEY (`warloadId`) REFERENCES `Warlord`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
