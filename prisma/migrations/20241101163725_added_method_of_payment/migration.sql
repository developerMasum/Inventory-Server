/*
  Warnings:

  - The `method` column on the `payments` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'BANK', 'CARD', 'BKASH', 'NAGAD', 'ROCKET');

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "paymentDate" SET DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "method",
ADD COLUMN     "method" "PaymentMethod" NOT NULL DEFAULT 'CARD',
ALTER COLUMN "invoiceUrl" DROP NOT NULL;
