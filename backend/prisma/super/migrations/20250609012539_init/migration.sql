-- AlterEnum
ALTER TYPE "paymentStatus" ADD VALUE 'expired';

-- AlterTable
ALTER TABLE "school" ADD COLUMN     "status" "status" NOT NULL DEFAULT 'active';
