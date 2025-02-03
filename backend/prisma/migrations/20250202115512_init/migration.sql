/*
  Warnings:

  - You are about to drop the column `name` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tutor` table. All the data in the column will be lost.
  - Added the required column `fullname` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `tutor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `tutor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `tutor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `tutor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin" DROP COLUMN "name",
ADD COLUMN     "fullname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tutor" DROP COLUMN "name",
ADD COLUMN     "contact" TEXT NOT NULL,
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "othername" TEXT,
ADD COLUMN     "role" "role" NOT NULL DEFAULT 'tutor',
ADD COLUMN     "surname" TEXT NOT NULL;
