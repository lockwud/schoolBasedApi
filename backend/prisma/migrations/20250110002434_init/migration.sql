/*
  Warnings:

  - You are about to drop the column `studentBatchNumber` on the `guardian` table. All the data in the column will be lost.
  - You are about to drop the column `studentBatchNumber` on the `paymentRequest` table. All the data in the column will be lost.
  - You are about to drop the column `tutorId` on the `student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `paymentRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `studentId` to the `guardian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `paymentRequest` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `studentId` on the `solveAssignment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `studentId` on the `student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `studentId` on the `studentTerminalReport` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "guardian" DROP CONSTRAINT "guardian_studentBatchNumber_fkey";

-- DropForeignKey
ALTER TABLE "paymentRequest" DROP CONSTRAINT "paymentRequest_studentBatchNumber_fkey";

-- DropForeignKey
ALTER TABLE "solveAssignment" DROP CONSTRAINT "solveAssignment_studentId_fkey";

-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "studentTerminalReport" DROP CONSTRAINT "studentTerminalReport_studentId_fkey";

-- AlterTable
ALTER TABLE "guardian" DROP COLUMN "studentBatchNumber",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "paymentRequest" DROP COLUMN "studentBatchNumber",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "solveAssignment" DROP COLUMN "studentId",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "student" DROP COLUMN "tutorId",
ALTER COLUMN "otherName" DROP NOT NULL,
DROP COLUMN "studentId",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "studentTerminalReport" DROP COLUMN "studentId",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "paymentRequest_studentId_key" ON "paymentRequest"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "student_studentId_key" ON "student"("studentId");

-- AddForeignKey
ALTER TABLE "solveAssignment" ADD CONSTRAINT "solveAssignment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guardian" ADD CONSTRAINT "guardian_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentRequest" ADD CONSTRAINT "paymentRequest_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentTerminalReport" ADD CONSTRAINT "studentTerminalReport_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;
