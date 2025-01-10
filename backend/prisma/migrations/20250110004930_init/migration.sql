-- DropForeignKey
ALTER TABLE "guardian" DROP CONSTRAINT "guardian_studentId_fkey";

-- DropForeignKey
ALTER TABLE "paymentRequest" DROP CONSTRAINT "paymentRequest_studentId_fkey";

-- DropForeignKey
ALTER TABLE "solveAssignment" DROP CONSTRAINT "solveAssignment_studentId_fkey";

-- DropForeignKey
ALTER TABLE "studentTerminalReport" DROP CONSTRAINT "studentTerminalReport_studentId_fkey";

-- AlterTable
ALTER TABLE "guardian" ALTER COLUMN "studentId" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "paymentRequest" ALTER COLUMN "studentId" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "solveAssignment" ALTER COLUMN "studentId" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "student" ALTER COLUMN "studentId" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "studentTerminalReport" ALTER COLUMN "studentId" SET DATA TYPE BIGINT;

-- AddForeignKey
ALTER TABLE "solveAssignment" ADD CONSTRAINT "solveAssignment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guardian" ADD CONSTRAINT "guardian_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentRequest" ADD CONSTRAINT "paymentRequest_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentTerminalReport" ADD CONSTRAINT "studentTerminalReport_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;
