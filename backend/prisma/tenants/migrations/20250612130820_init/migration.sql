/*
  Warnings:

  - You are about to drop the column `subject` on the `Assessment` table. All the data in the column will be lost.
  - You are about to drop the column `class` on the `Timetable` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `tutor` table. All the data in the column will be lost.
  - You are about to drop the `MigrationLog` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subjectId` to the `Assessment` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `term` on the `Assessment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `attendance` to the `TerminalReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalClassAttendance` to the `TerminalReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalClassPerformance` to the `TerminalReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TerminalReport` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `term` on the `TerminalReport` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `classId` to the `Timetable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Timetable` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `level` on the `student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Term" AS ENUM ('FIRST', 'SECOND', 'THIRD');

-- CreateEnum
CREATE TYPE "ClassLevel" AS ENUM ('primary', 'jhs');

-- AlterTable
ALTER TABLE "Assessment" DROP COLUMN "subject",
ADD COLUMN     "subjectId" TEXT NOT NULL,
ADD COLUMN     "tutorId" TEXT,
DROP COLUMN "term",
ADD COLUMN     "term" "Term" NOT NULL;

-- AlterTable
ALTER TABLE "SchoolSetting" ADD COLUMN     "attendancePolicy" JSONB,
ADD COLUMN     "classLevels" JSONB,
ADD COLUMN     "contactInfo" JSONB,
ADD COLUMN     "paymentMethods" JSONB,
ADD COLUMN     "schoolAchievements" JSONB,
ADD COLUMN     "schoolAddress" TEXT,
ADD COLUMN     "schoolEmail" TEXT,
ADD COLUMN     "schoolHistory" TEXT,
ADD COLUMN     "schoolMission" TEXT,
ADD COLUMN     "schoolMotto" TEXT,
ADD COLUMN     "schoolPhone" TEXT,
ADD COLUMN     "schoolValues" JSONB,
ADD COLUMN     "schoolVision" TEXT,
ADD COLUMN     "schoolWebsite" TEXT,
ALTER COLUMN "schoolName" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TerminalReport" ADD COLUMN     "adminSignature" TEXT,
ADD COLUMN     "attendance" JSONB NOT NULL,
ADD COLUMN     "behavior" TEXT,
ADD COLUMN     "discipline" TEXT,
ADD COLUMN     "extraCurricular" TEXT,
ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "finalClassAttendance" JSONB NOT NULL,
ADD COLUMN     "finalClassPerformance" JSONB NOT NULL,
ADD COLUMN     "finalGrade" TEXT,
ADD COLUMN     "finalScore" DOUBLE PRECISION,
ADD COLUMN     "headTeacherSignature" TEXT,
ADD COLUMN     "parentMeeting" TEXT,
ADD COLUMN     "position" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "term",
ADD COLUMN     "term" "Term" NOT NULL;

-- AlterTable
ALTER TABLE "Timetable" DROP COLUMN "class",
ADD COLUMN     "classId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "student" DROP COLUMN "level",
ADD COLUMN     "level" "ClassLevel" NOT NULL;

-- AlterTable
ALTER TABLE "tutor" DROP COLUMN "subject";

-- DropTable
DROP TABLE "MigrationLog";

-- CreateTable
CREATE TABLE "classRooms" (
    "id" TEXT NOT NULL,
    "classname" TEXT NOT NULL,
    "description" TEXT,
    "capacity" INTEGER NOT NULL,
    "isFull" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "classRooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_adminToclassRooms" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_adminTotutor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_adminTostudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_classRoomsTotutor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SubjectTotutor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SubjectToTerminalReport" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_studentTotutor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GuardianToadmin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AssessmentToadmin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TerminalReportTotutor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TerminalReportToadmin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TranscriptToadmin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToadmin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TimetableTotutor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TimetableToadmin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PaymentToadmin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AttendanceTotutor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AttendanceToadmin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SchoolSettingToadmin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_code_key" ON "Subject"("code");

-- CreateIndex
CREATE UNIQUE INDEX "_adminToclassRooms_AB_unique" ON "_adminToclassRooms"("A", "B");

-- CreateIndex
CREATE INDEX "_adminToclassRooms_B_index" ON "_adminToclassRooms"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_adminTotutor_AB_unique" ON "_adminTotutor"("A", "B");

-- CreateIndex
CREATE INDEX "_adminTotutor_B_index" ON "_adminTotutor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_adminTostudent_AB_unique" ON "_adminTostudent"("A", "B");

-- CreateIndex
CREATE INDEX "_adminTostudent_B_index" ON "_adminTostudent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_classRoomsTotutor_AB_unique" ON "_classRoomsTotutor"("A", "B");

-- CreateIndex
CREATE INDEX "_classRoomsTotutor_B_index" ON "_classRoomsTotutor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SubjectTotutor_AB_unique" ON "_SubjectTotutor"("A", "B");

-- CreateIndex
CREATE INDEX "_SubjectTotutor_B_index" ON "_SubjectTotutor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SubjectToTerminalReport_AB_unique" ON "_SubjectToTerminalReport"("A", "B");

-- CreateIndex
CREATE INDEX "_SubjectToTerminalReport_B_index" ON "_SubjectToTerminalReport"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_studentTotutor_AB_unique" ON "_studentTotutor"("A", "B");

-- CreateIndex
CREATE INDEX "_studentTotutor_B_index" ON "_studentTotutor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GuardianToadmin_AB_unique" ON "_GuardianToadmin"("A", "B");

-- CreateIndex
CREATE INDEX "_GuardianToadmin_B_index" ON "_GuardianToadmin"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AssessmentToadmin_AB_unique" ON "_AssessmentToadmin"("A", "B");

-- CreateIndex
CREATE INDEX "_AssessmentToadmin_B_index" ON "_AssessmentToadmin"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TerminalReportTotutor_AB_unique" ON "_TerminalReportTotutor"("A", "B");

-- CreateIndex
CREATE INDEX "_TerminalReportTotutor_B_index" ON "_TerminalReportTotutor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TerminalReportToadmin_AB_unique" ON "_TerminalReportToadmin"("A", "B");

-- CreateIndex
CREATE INDEX "_TerminalReportToadmin_B_index" ON "_TerminalReportToadmin"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TranscriptToadmin_AB_unique" ON "_TranscriptToadmin"("A", "B");

-- CreateIndex
CREATE INDEX "_TranscriptToadmin_B_index" ON "_TranscriptToadmin"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToadmin_AB_unique" ON "_EventToadmin"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToadmin_B_index" ON "_EventToadmin"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TimetableTotutor_AB_unique" ON "_TimetableTotutor"("A", "B");

-- CreateIndex
CREATE INDEX "_TimetableTotutor_B_index" ON "_TimetableTotutor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TimetableToadmin_AB_unique" ON "_TimetableToadmin"("A", "B");

-- CreateIndex
CREATE INDEX "_TimetableToadmin_B_index" ON "_TimetableToadmin"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PaymentToadmin_AB_unique" ON "_PaymentToadmin"("A", "B");

-- CreateIndex
CREATE INDEX "_PaymentToadmin_B_index" ON "_PaymentToadmin"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AttendanceTotutor_AB_unique" ON "_AttendanceTotutor"("A", "B");

-- CreateIndex
CREATE INDEX "_AttendanceTotutor_B_index" ON "_AttendanceTotutor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AttendanceToadmin_AB_unique" ON "_AttendanceToadmin"("A", "B");

-- CreateIndex
CREATE INDEX "_AttendanceToadmin_B_index" ON "_AttendanceToadmin"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SchoolSettingToadmin_AB_unique" ON "_SchoolSettingToadmin"("A", "B");

-- CreateIndex
CREATE INDEX "_SchoolSettingToadmin_B_index" ON "_SchoolSettingToadmin"("B");

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timetable" ADD CONSTRAINT "Timetable_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classRooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_adminToclassRooms" ADD CONSTRAINT "_adminToclassRooms_A_fkey" FOREIGN KEY ("A") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_adminToclassRooms" ADD CONSTRAINT "_adminToclassRooms_B_fkey" FOREIGN KEY ("B") REFERENCES "classRooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_adminTotutor" ADD CONSTRAINT "_adminTotutor_A_fkey" FOREIGN KEY ("A") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_adminTotutor" ADD CONSTRAINT "_adminTotutor_B_fkey" FOREIGN KEY ("B") REFERENCES "tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_adminTostudent" ADD CONSTRAINT "_adminTostudent_A_fkey" FOREIGN KEY ("A") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_adminTostudent" ADD CONSTRAINT "_adminTostudent_B_fkey" FOREIGN KEY ("B") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_classRoomsTotutor" ADD CONSTRAINT "_classRoomsTotutor_A_fkey" FOREIGN KEY ("A") REFERENCES "classRooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_classRoomsTotutor" ADD CONSTRAINT "_classRoomsTotutor_B_fkey" FOREIGN KEY ("B") REFERENCES "tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectTotutor" ADD CONSTRAINT "_SubjectTotutor_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectTotutor" ADD CONSTRAINT "_SubjectTotutor_B_fkey" FOREIGN KEY ("B") REFERENCES "tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToTerminalReport" ADD CONSTRAINT "_SubjectToTerminalReport_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubjectToTerminalReport" ADD CONSTRAINT "_SubjectToTerminalReport_B_fkey" FOREIGN KEY ("B") REFERENCES "TerminalReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_studentTotutor" ADD CONSTRAINT "_studentTotutor_A_fkey" FOREIGN KEY ("A") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_studentTotutor" ADD CONSTRAINT "_studentTotutor_B_fkey" FOREIGN KEY ("B") REFERENCES "tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuardianToadmin" ADD CONSTRAINT "_GuardianToadmin_A_fkey" FOREIGN KEY ("A") REFERENCES "Guardian"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuardianToadmin" ADD CONSTRAINT "_GuardianToadmin_B_fkey" FOREIGN KEY ("B") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssessmentToadmin" ADD CONSTRAINT "_AssessmentToadmin_A_fkey" FOREIGN KEY ("A") REFERENCES "Assessment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AssessmentToadmin" ADD CONSTRAINT "_AssessmentToadmin_B_fkey" FOREIGN KEY ("B") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TerminalReportTotutor" ADD CONSTRAINT "_TerminalReportTotutor_A_fkey" FOREIGN KEY ("A") REFERENCES "TerminalReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TerminalReportTotutor" ADD CONSTRAINT "_TerminalReportTotutor_B_fkey" FOREIGN KEY ("B") REFERENCES "tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TerminalReportToadmin" ADD CONSTRAINT "_TerminalReportToadmin_A_fkey" FOREIGN KEY ("A") REFERENCES "TerminalReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TerminalReportToadmin" ADD CONSTRAINT "_TerminalReportToadmin_B_fkey" FOREIGN KEY ("B") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TranscriptToadmin" ADD CONSTRAINT "_TranscriptToadmin_A_fkey" FOREIGN KEY ("A") REFERENCES "Transcript"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TranscriptToadmin" ADD CONSTRAINT "_TranscriptToadmin_B_fkey" FOREIGN KEY ("B") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToadmin" ADD CONSTRAINT "_EventToadmin_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToadmin" ADD CONSTRAINT "_EventToadmin_B_fkey" FOREIGN KEY ("B") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TimetableTotutor" ADD CONSTRAINT "_TimetableTotutor_A_fkey" FOREIGN KEY ("A") REFERENCES "Timetable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TimetableTotutor" ADD CONSTRAINT "_TimetableTotutor_B_fkey" FOREIGN KEY ("B") REFERENCES "tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TimetableToadmin" ADD CONSTRAINT "_TimetableToadmin_A_fkey" FOREIGN KEY ("A") REFERENCES "Timetable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TimetableToadmin" ADD CONSTRAINT "_TimetableToadmin_B_fkey" FOREIGN KEY ("B") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentToadmin" ADD CONSTRAINT "_PaymentToadmin_A_fkey" FOREIGN KEY ("A") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PaymentToadmin" ADD CONSTRAINT "_PaymentToadmin_B_fkey" FOREIGN KEY ("B") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceTotutor" ADD CONSTRAINT "_AttendanceTotutor_A_fkey" FOREIGN KEY ("A") REFERENCES "Attendance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceTotutor" ADD CONSTRAINT "_AttendanceTotutor_B_fkey" FOREIGN KEY ("B") REFERENCES "tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceToadmin" ADD CONSTRAINT "_AttendanceToadmin_A_fkey" FOREIGN KEY ("A") REFERENCES "Attendance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceToadmin" ADD CONSTRAINT "_AttendanceToadmin_B_fkey" FOREIGN KEY ("B") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SchoolSettingToadmin" ADD CONSTRAINT "_SchoolSettingToadmin_A_fkey" FOREIGN KEY ("A") REFERENCES "SchoolSetting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SchoolSettingToadmin" ADD CONSTRAINT "_SchoolSettingToadmin_B_fkey" FOREIGN KEY ("B") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
