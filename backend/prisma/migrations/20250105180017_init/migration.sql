/*
  Warnings:

  - Made the column `passwordResetExpiration` on table `tutor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tutor" ALTER COLUMN "passwordResetExpiration" SET NOT NULL;
