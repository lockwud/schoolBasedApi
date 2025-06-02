-- CreateEnum
CREATE TYPE "role" AS ENUM ('super');

-- CreateEnum
CREATE TYPE "schooltype" AS ENUM ('private', 'government');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('active', 'inactive', 'suspended');

-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('demo', 'paid', 'unpaid');

-- CreateTable
CREATE TABLE "superAdmin" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" "status" NOT NULL DEFAULT 'inactive',
    "otp" TEXT,
    "token" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "role" "role" NOT NULL DEFAULT 'super',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "superAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school" (
    "id" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "type" "schooltype" NOT NULL,
    "feesRequired" BOOLEAN NOT NULL DEFAULT false,
    "code" TEXT NOT NULL,
    "admins" TEXT[],
    "maxtotalAdmins" INTEGER NOT NULL DEFAULT 3,
    "databaseName" TEXT NOT NULL,
    "databaseUrl" TEXT NOT NULL,
    "contact" TEXT,
    "email" TEXT,
    "logoUrl" TEXT,
    "logoKey" TEXT,
    "address" TEXT,
    "subscription" BOOLEAN NOT NULL DEFAULT false,
    "paymentStatus" "paymentStatus" NOT NULL DEFAULT 'demo',
    "subscriptionDate" TIMESTAMP(3) NOT NULL,
    "EndOfLife" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "superAdminId" TEXT NOT NULL,

    CONSTRAINT "school_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "superAdmin_email_key" ON "superAdmin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "superAdmin_phone_key" ON "superAdmin"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "school_code_key" ON "school"("code");

-- CreateIndex
CREATE UNIQUE INDEX "school_databaseName_key" ON "school"("databaseName");

-- AddForeignKey
ALTER TABLE "school" ADD CONSTRAINT "school_superAdminId_fkey" FOREIGN KEY ("superAdminId") REFERENCES "superAdmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
