/*
  Warnings:

  - You are about to drop the column `EndOfLife` on the `school` table. All the data in the column will be lost.
  - Added the required column `endOfLife` to the `school` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "school" DROP COLUMN "EndOfLife",
ADD COLUMN     "endOfLife" TIMESTAMP(3) NOT NULL;
