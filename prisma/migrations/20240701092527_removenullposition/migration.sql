/*
  Warnings:

  - Made the column `position` on table `ListItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `ListItem` MODIFY `position` INTEGER NOT NULL;
