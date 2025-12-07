/*
  Warnings:

  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `electricity_bill_readings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `houseowner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `houses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `maintenance_requests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `managers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nidinfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rent_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tenant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "admin" DROP CONSTRAINT "admin_userId_fkey";

-- DropForeignKey
ALTER TABLE "electricity_bill_readings" DROP CONSTRAINT "electricity_bill_readings_roomId_fkey";

-- DropForeignKey
ALTER TABLE "houseowner" DROP CONSTRAINT "houseowner_userId_fkey";

-- DropForeignKey
ALTER TABLE "houses" DROP CONSTRAINT "houses_managerId_fkey";

-- DropForeignKey
ALTER TABLE "houses" DROP CONSTRAINT "houses_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "maintenance_requests" DROP CONSTRAINT "maintenance_requests_roomId_fkey";

-- DropForeignKey
ALTER TABLE "managers" DROP CONSTRAINT "managers_houseOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "managers" DROP CONSTRAINT "managers_userId_fkey";

-- DropForeignKey
ALTER TABLE "nidinfo" DROP CONSTRAINT "nidinfo_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_roomId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "rent_info" DROP CONSTRAINT "rent_info_roomId_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_houseId_fkey";

-- DropForeignKey
ALTER TABLE "tenant" DROP CONSTRAINT "tenant_roomId_fkey";

-- DropTable
DROP TABLE "admin";

-- DropTable
DROP TABLE "electricity_bill_readings";

-- DropTable
DROP TABLE "houseowner";

-- DropTable
DROP TABLE "houses";

-- DropTable
DROP TABLE "maintenance_requests";

-- DropTable
DROP TABLE "managers";

-- DropTable
DROP TABLE "nidinfo";

-- DropTable
DROP TABLE "payments";

-- DropTable
DROP TABLE "rent_info";

-- DropTable
DROP TABLE "rooms";

-- DropTable
DROP TABLE "tenant";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "PaymentMethod";

-- DropEnum
DROP TYPE "RequestStatus";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "purchasePrice" DOUBLE PRECISION NOT NULL,
    "salePrice" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "supplierId" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleItem" (
    "id" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SaleItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleItem" ADD CONSTRAINT "SaleItem_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleItem" ADD CONSTRAINT "SaleItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
