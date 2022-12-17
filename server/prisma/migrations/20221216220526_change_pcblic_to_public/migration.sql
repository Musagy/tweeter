/*
  Warnings:

  - You are about to drop the column `pcblic` on the `Posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "pcblic",
ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT true;
