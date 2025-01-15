/*
  Warnings:

  - You are about to drop the column `name` on the `subject` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subjectName]` on the table `subject` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subjectName` to the `subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subject" DROP COLUMN "name",
ADD COLUMN     "subjectName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "subject_subjectName_key" ON "subject"("subjectName");
