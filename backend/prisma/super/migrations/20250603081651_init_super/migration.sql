/*
  Warnings:

  - You are about to drop the column `code` on the `school` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "school_code_key";

-- AlterTable
ALTER TABLE "school" DROP COLUMN "code";
