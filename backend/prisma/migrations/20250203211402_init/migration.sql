/*
  Warnings:

  - You are about to drop the column `superAdminId` on the `superAdmin` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "school" DROP CONSTRAINT "school_superAdminId_fkey";

-- DropIndex
DROP INDEX "superAdmin_superAdminId_key";

-- AlterTable
ALTER TABLE "superAdmin" DROP COLUMN "superAdminId";

-- AddForeignKey
ALTER TABLE "school" ADD CONSTRAINT "school_superAdminId_fkey" FOREIGN KEY ("superAdminId") REFERENCES "superAdmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
