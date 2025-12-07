/*
  Warnings:

  - You are about to alter the column `purchasePrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `salePrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `total` on the `Sale` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `unitPrice` on the `SaleItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - Changed the type of `paymentMethod` on the `Sale` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'CARD', 'MOBILE', 'OTHER');

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "purchasePrice" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "salePrice" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "stock" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "total" SET DATA TYPE DECIMAL(12,2),
DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL;

-- AlterTable
ALTER TABLE "SaleItem" ALTER COLUMN "unitPrice" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
