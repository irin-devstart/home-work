/*
  Warnings:

  - You are about to drop the column `totalDiscount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `totalItem` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `subTotalPrice` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `totalDiscount` on the `OrderItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "totalDiscount",
DROP COLUMN "totalItem";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "discount",
DROP COLUMN "subTotalPrice",
DROP COLUMN "totalDiscount";
