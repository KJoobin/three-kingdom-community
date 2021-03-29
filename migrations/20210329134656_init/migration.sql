/*
  Warnings:

  - Added the required column `rank` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `percentage` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Skill` ADD COLUMN     `rank` VARCHAR(191) NOT NULL,
    ADD COLUMN     `target` VARCHAR(191) NOT NULL,
    ADD COLUMN     `percentage` INTEGER NOT NULL;
