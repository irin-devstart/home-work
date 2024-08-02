/*
  Warnings:

  - You are about to drop the column `name` on the `Order` table. All the data in the column will be lost.
  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MANAGER');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'SHIPPED', 'DELIVERY');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "name",
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'ADMIN';

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "Status";
