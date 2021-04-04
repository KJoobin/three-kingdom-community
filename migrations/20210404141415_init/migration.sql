-- CreateTable
CREATE TABLE `WarlordCombine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_WarlordToWarlordCombine` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,
UNIQUE INDEX `_WarlordToWarlordCombine_AB_unique`(`A`, `B`),
INDEX `_WarlordToWarlordCombine_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_WarlordToWarlordCombine` ADD FOREIGN KEY (`A`) REFERENCES `Warlord`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_WarlordToWarlordCombine` ADD FOREIGN KEY (`B`) REFERENCES `WarlordCombine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
