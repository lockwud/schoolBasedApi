-- CreateEnum
CREATE TYPE "role" AS ENUM ('superAdmin', 'admin', 'student', 'tutor', 'guardian', 'parent');

-- CreateEnum
CREATE TYPE "schoolTypes" AS ENUM ('seniorHigh', 'basic_jhs');

-- CreateEnum
CREATE TYPE "schoolCategory" AS ENUM ('private', 'government');

-- CreateEnum
CREATE TYPE "qualification" AS ENUM ('SHS', 'BED', 'BSC', 'MFIL', 'MED', 'PHD', 'DIP');

-- CreateEnum
CREATE TYPE "specialization" AS ENUM ('MATHEMATICS', 'ENGLISH', 'SCIENCE', 'IT', 'SOCIAL', 'ECONOMICS', 'AGRICULTURE', 'ELECTRICALS');

-- CreateEnum
CREATE TYPE "parent" AS ENUM ('mother', 'father', 'guardian');

-- CreateEnum
CREATE TYPE "gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('active', 'inactive', 'graduated', 'withdrawn', 'deceased', 'transfer', 'transferredOut', 'transferredIn', 'temporary', 'suspended', 'deleted', 'banned');

-- CreateEnum
CREATE TYPE "attendanceStatus" AS ENUM ('present', 'absent', 'partial');

-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('paid', 'pending', 'cancelled', 'failed', 'refunded', 'partial', 'partiallyRefunded');

-- CreateEnum
CREATE TYPE "paymentType" AS ENUM ('cash', 'card', 'mobileMoney');

-- CreateTable
CREATE TABLE "superAdmin" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" "status" NOT NULL DEFAULT 'active',
    "otp" TEXT,
    "token" TEXT,
    "otpAttempts" INTEGER DEFAULT 0,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "role" "role" NOT NULL DEFAULT 'superAdmin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "superAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school" (
    "id" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "categrory" "schoolCategory" NOT NULL,
    "type" "schoolTypes" NOT NULL,
    "feesRequired" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "maxtotalAdmins" INTEGER NOT NULL DEFAULT 3,
    "superAdminId" TEXT NOT NULL,

    CONSTRAINT "school_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" "role" NOT NULL DEFAULT 'admin',
    "status" "status" NOT NULL DEFAULT 'inactive',
    "otp" TEXT,
    "token" TEXT,
    "otpAttempts" INTEGER DEFAULT 0,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "schoolCode" TEXT NOT NULL,
    "tutorRegistrationCode" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tutor" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "othername" TEXT,
    "gender" "gender" NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "pictureUrl" TEXT,
    "pictureKey" TEXT,
    "phone" TEXT NOT NULL,
    "role" "role" NOT NULL DEFAULT 'tutor',
    "specialization" "specialization" NOT NULL,
    "qualification" "qualification" NOT NULL,
    "registrationCode" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "otp" TEXT,
    "token" TEXT,
    "otpAttempts" INTEGER DEFAULT 0,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "otherName" TEXT,
    "gender" "gender" NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "photoUrl" TEXT,
    "photoKey" TEXT,
    "studentId" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "contact" TEXT,
    "parentContact" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "classId" TEXT,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject" (
    "id" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,
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
    "schoolId" TEXT NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "attendanceStatus" "attendanceStatus" NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "classId" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "adminId" TEXT,
    "studentTerminalReportId" TEXT,

    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guardian" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "gender" "gender" NOT NULL,
    "studentId" TEXT NOT NULL,
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
    "studentId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentType" "paymentType" NOT NULL,
    "attendanceStatus" "paymentStatus" NOT NULL,
    "guardianId" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
    "className" TEXT,
    "position" INTEGER NOT NULL,
    "numRoll" INTEGER NOT NULL,
    "tutorsRemarks" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "guardianId" TEXT,

    CONSTRAINT "studentTerminalReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "healthRecord" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "allergies" TEXT,
    "medications" TEXT,
    "emergencyContact" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "healthRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timetable" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "schoolId" TEXT,
    "tutorId" TEXT,

    CONSTRAINT "timetable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "participants" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "schoolId" TEXT,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "library" (
    "id" TEXT NOT NULL,
    "bookTitle" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "availableCopies" INTEGER NOT NULL,
    "schoolId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "schoolId" TEXT,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "adminId" TEXT,
    "studentId" TEXT,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discipline" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "actionTaken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "discipline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_studentTosubject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_subjectTotutor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_classesTosubject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_classesTotutor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "superAdmin_email_key" ON "superAdmin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "superAdmin_phone_key" ON "superAdmin"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "school_schoolName_key" ON "school"("schoolName");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_phone_key" ON "admin"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "admin_tutorRegistrationCode_key" ON "admin"("tutorRegistrationCode");

-- CreateIndex
CREATE UNIQUE INDEX "tutor_email_key" ON "tutor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "student_studentId_key" ON "student"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "subject_subjectName_key" ON "subject"("subjectName");

-- CreateIndex
CREATE UNIQUE INDEX "guardian_email_key" ON "guardian"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_studentTosubject_AB_unique" ON "_studentTosubject"("A", "B");

-- CreateIndex
CREATE INDEX "_studentTosubject_B_index" ON "_studentTosubject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_subjectTotutor_AB_unique" ON "_subjectTotutor"("A", "B");

-- CreateIndex
CREATE INDEX "_subjectTotutor_B_index" ON "_subjectTotutor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_classesTosubject_AB_unique" ON "_classesTosubject"("A", "B");

-- CreateIndex
CREATE INDEX "_classesTosubject_B_index" ON "_classesTosubject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_classesTotutor_AB_unique" ON "_classesTotutor"("A", "B");

-- CreateIndex
CREATE INDEX "_classesTotutor_B_index" ON "_classesTotutor"("B");

-- AddForeignKey
ALTER TABLE "school" ADD CONSTRAINT "school_superAdminId_fkey" FOREIGN KEY ("superAdminId") REFERENCES "superAdmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_schoolCode_fkey" FOREIGN KEY ("schoolCode") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutor" ADD CONSTRAINT "tutor_registrationCode_fkey" FOREIGN KEY ("registrationCode") REFERENCES "admin"("tutorRegistrationCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tutor" ADD CONSTRAINT "tutor_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_studentTerminalReportId_fkey" FOREIGN KEY ("studentTerminalReportId") REFERENCES "studentTerminalReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance" ADD CONSTRAINT "attendance_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "guardian" ADD CONSTRAINT "guardian_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentRequest" ADD CONSTRAINT "paymentRequest_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "guardian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paymentRequest" ADD CONSTRAINT "paymentRequest_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachingMaterials" ADD CONSTRAINT "teachingMaterials_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teachingMaterials" ADD CONSTRAINT "teachingMaterials_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentTerminalReport" ADD CONSTRAINT "studentTerminalReport_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentTerminalReport" ADD CONSTRAINT "studentTerminalReport_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "guardian"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentTerminalReport" ADD CONSTRAINT "studentTerminalReport_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "healthRecord" ADD CONSTRAINT "healthRecord_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetable" ADD CONSTRAINT "timetable_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetable" ADD CONSTRAINT "timetable_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetable" ADD CONSTRAINT "timetable_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "timetable" ADD CONSTRAINT "timetable_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "library" ADD CONSTRAINT "library_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discipline" ADD CONSTRAINT "discipline_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_studentTosubject" ADD CONSTRAINT "_studentTosubject_A_fkey" FOREIGN KEY ("A") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_studentTosubject" ADD CONSTRAINT "_studentTosubject_B_fkey" FOREIGN KEY ("B") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_subjectTotutor" ADD CONSTRAINT "_subjectTotutor_A_fkey" FOREIGN KEY ("A") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_subjectTotutor" ADD CONSTRAINT "_subjectTotutor_B_fkey" FOREIGN KEY ("B") REFERENCES "tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_classesTosubject" ADD CONSTRAINT "_classesTosubject_A_fkey" FOREIGN KEY ("A") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_classesTosubject" ADD CONSTRAINT "_classesTosubject_B_fkey" FOREIGN KEY ("B") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_classesTotutor" ADD CONSTRAINT "_classesTotutor_A_fkey" FOREIGN KEY ("A") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_classesTotutor" ADD CONSTRAINT "_classesTotutor_B_fkey" FOREIGN KEY ("B") REFERENCES "tutor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
