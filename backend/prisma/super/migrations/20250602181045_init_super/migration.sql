/*
  Warnings:

  - You are about to drop the column `superAdminId` on the `school` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "school" DROP CONSTRAINT "school_superAdminId_fkey";

-- AlterTable
ALTER TABLE "school" DROP COLUMN "superAdminId";

-- CreateTable
CREATE TABLE "_schoolTosuperAdmin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_schoolTosuperAdmin_AB_unique" ON "_schoolTosuperAdmin"("A", "B");

-- CreateIndex
CREATE INDEX "_schoolTosuperAdmin_B_index" ON "_schoolTosuperAdmin"("B");

-- AddForeignKey
ALTER TABLE "_schoolTosuperAdmin" ADD CONSTRAINT "_schoolTosuperAdmin_A_fkey" FOREIGN KEY ("A") REFERENCES "school"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_schoolTosuperAdmin" ADD CONSTRAINT "_schoolTosuperAdmin_B_fkey" FOREIGN KEY ("B") REFERENCES "superAdmin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
