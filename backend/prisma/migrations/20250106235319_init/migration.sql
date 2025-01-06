-- AlterTable
ALTER TABLE "tutor" ADD COLUMN     "otp" TEXT,
ADD COLUMN     "otpExpired" BOOLEAN NOT NULL DEFAULT false;
