/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Supplier_id_key" ON "Supplier"("id");
