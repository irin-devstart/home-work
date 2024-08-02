/*
  Warnings:

  - The values [VIEWER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'SHIPPED', 'DELIVERY');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'MANAGER');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'ADMIN';
COMMIT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
