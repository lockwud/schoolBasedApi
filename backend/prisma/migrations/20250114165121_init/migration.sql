/*
  Warnings:

  - You are about to drop the column `tutorId` on the `subject` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "subject" DROP CONSTRAINT "subject_tutorId_fkey";

-- AlterTable
ALTER TABLE "admin" ALTER COLUMN "maxUsedCode" SET DEFAULT 5;

-- AlterTable
ALTER TABLE "subject" DROP COLUMN "tutorId";

-- CreateTable
CREATE TABLE "_subjectTotutor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_subjectTotutor_AB_unique" ON "_subjectTotutor"("A", "B");

-- CreateIndex
CREATE INDEX "_subjectTotutor_B_index" ON "_subjectTotutor"("B");

-- AddForeignKey
ALTER TABLE "_subjectTotutor" ADD CONSTRAINT "_subjectTotutor_A_fkey" FOREIGN KEY ("A") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_subjectTotutor" ADD CONSTRAINT "_subjectTotutor_B_fkey" FOREIGN KEY ("B") REFERENCES "tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
