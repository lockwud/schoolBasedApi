-- CreateEnum
CREATE TYPE "status" AS ENUM ('present', 'absent');

-- CreateEnum
CREATE TYPE "gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('paid', 'pending', 'cancelled', 'failed', 'refunded', 'partial', 'partiallyRefunded');

-- CreateEnum
CREATE TYPE "paymentType" AS ENUM ('cash', 'card', 'mobileMoney');

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "otp" TEXT,
    "otpExpired" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "passwordResetToken" TEXT,
    "hashedResetLink" TEXT,
    "hashedResetLinkExpired" BOOLEAN NOT NULL DEFAULT false,
    "generatedRegistrationCodes" TEXT NOT NULL,
    "maxUsedCode" INTEGER NOT NULL DEFAULT 3,
    "totalCodeUsed" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutor" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" "gender" NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "otp" TEXT,
    "otpExpired" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "classId" TEXT,
    "del_flag" BOOLEAN NOT NULL DEFAULT false,
    "registeredCode" TEXT NOT NULL,
    "passwordResetToken" TEXT,
    "hashedResetLink" TEXT,
    "hashedResetLinkExpired" BOOLEAN NOT NULL DEFAULT false,
    "passwordResetCompleted" BOOLEAN NOT NULL DEFAULT false,
    "passwordResetExpiration" TIMESTAMP(3),

    CONSTRAINT "tutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "otherName" TEXT NOT NULL,
    "gender" "gender" NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "photoKey" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "contact" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tutorId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "del_flag" BOOLEAN NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tutorId" TEXT[],

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance" (
    "id" TEXT NOT NULL,
    "studentId" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "attendanceStatus" "status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "classId" TEXT NOT NULL,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignment" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solveAssignment" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "assignmentId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "solveAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guardian" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "gender" "gender" NOT NULL,
    "studentBatchNumber" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guardian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentRequest" (
    "id" TEXT NOT NULL,
    "guadianId" TEXT NOT NULL,
    "studentBatchNumber" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentType" "paymentType" NOT NULL,
    "status" "paymentStatus" NOT NULL,

    CONSTRAINT "paymentRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teachingMaterials" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teachingMaterials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentTerminalReport" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "numOfSubject" INTEGER NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "averageScore" DOUBLE PRECISION NOT NULL,
    "classId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "numRoll" INTEGER NOT NULL,
    "tutorsRemarks" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "studentTerminalReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_studentTosubject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_attendanceTostudentTerminalReport" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_studentTerminalReportTosubject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_passwordResetToken_key" ON "admin"("passwordResetToken");

-- CreateIndex
CREATE UNIQUE INDEX "admin_generatedRegistrationCodes_key" ON "admin"("generatedRegistrationCodes");

-- CreateIndex
CREATE UNIQUE INDEX "tutor_email_key" ON "tutor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tutor_passwordResetToken_key" ON "tutor"("passwordResetToken");

-- CreateIndex
CREATE UNIQUE INDEX "student_studentId_key" ON "student"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "student_classId_key" ON "student"("classId");

-- CreateIndex
CREATE UNIQUE INDEX "guardian_email_key" ON "guardian"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_studentTosubject_AB_unique" ON "_studentTosubject"("A", "B");

-- CreateIndex
CREATE INDEX "_studentTosubject_B_index" ON "_studentTosubject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_attendanceTostudentTerminalReport_AB_unique" ON "_attendanceTostudentTerminalReport"("A", "B");

-- CreateIndex
CREATE INDEX "_attendanceTostudentTerminalReport_B_index" ON "_attendanceTostudentTerminalReport"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_studentTerminalReportTosubject_AB_unique" ON "_studentTerminalReportTosubject"("A", "B");

-- CreateIndex
CREATE INDEX "_studentTerminalReportTosubject_B_index" ON "_studentTerminalReportTosubject"("B");

-- AddForeignKey
ALTER TABLE "tutor" ADD CONSTRAINT "tutor_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutor" ADD CONSTRAINT "tutor_registeredCode_fkey" FOREIGN KEY ("registeredCode") REFERENCES "admin"("generatedRegistrationCodes") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignment" ADD CONSTRAINT "assignment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignment" ADD CONSTRAINT "assignment_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solveAssignment" ADD CONSTRAINT "solveAssignment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solveAssignment" ADD CONSTRAINT "solveAssignment_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "assignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guardian" ADD CONSTRAINT "guardian_studentBatchNumber_fkey" FOREIGN KEY ("studentBatchNumber") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentRequest" ADD CONSTRAINT "paymentRequest_guadianId_fkey" FOREIGN KEY ("guadianId") REFERENCES "guardian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentRequest" ADD CONSTRAINT "paymentRequest_studentBatchNumber_fkey" FOREIGN KEY ("studentBatchNumber") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachingMaterials" ADD CONSTRAINT "teachingMaterials_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachingMaterials" ADD CONSTRAINT "teachingMaterials_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentTerminalReport" ADD CONSTRAINT "studentTerminalReport_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentTerminalReport" ADD CONSTRAINT "studentTerminalReport_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_studentTosubject" ADD CONSTRAINT "_studentTosubject_A_fkey" FOREIGN KEY ("A") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_studentTosubject" ADD CONSTRAINT "_studentTosubject_B_fkey" FOREIGN KEY ("B") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_attendanceTostudentTerminalReport" ADD CONSTRAINT "_attendanceTostudentTerminalReport_A_fkey" FOREIGN KEY ("A") REFERENCES "attendance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_attendanceTostudentTerminalReport" ADD CONSTRAINT "_attendanceTostudentTerminalReport_B_fkey" FOREIGN KEY ("B") REFERENCES "studentTerminalReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_studentTerminalReportTosubject" ADD CONSTRAINT "_studentTerminalReportTosubject_A_fkey" FOREIGN KEY ("A") REFERENCES "studentTerminalReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_studentTerminalReportTosubject" ADD CONSTRAINT "_studentTerminalReportTosubject_B_fkey" FOREIGN KEY ("B") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
