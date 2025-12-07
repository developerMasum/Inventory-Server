-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_tenantId_fkey";

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "tenantId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
