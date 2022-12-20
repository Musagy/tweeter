/*
  Warnings:

  - You are about to drop the `Replies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Replies" DROP CONSTRAINT "Replies_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Replies" DROP CONSTRAINT "Replies_replyId_fkey";

-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "parentId" INTEGER;

-- DropTable
DROP TABLE "Replies";

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
