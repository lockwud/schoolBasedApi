/*
  Warnings:

  - You are about to drop the column `pictureKey` on the `tutor` table. All the data in the column will be lost.
  - You are about to drop the column `pictureUrl` on the `tutor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tutor" DROP COLUMN "pictureKey",
DROP COLUMN "pictureUrl";
