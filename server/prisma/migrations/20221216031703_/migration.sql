/*
  Warnings:

  - You are about to drop the column `public` on the `Posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "public",
ADD COLUMN     "pcblic" BOOLEAN NOT NULL DEFAULT true;
