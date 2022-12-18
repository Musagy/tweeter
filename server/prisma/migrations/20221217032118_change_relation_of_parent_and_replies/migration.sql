/*
  Warnings:

  - A unique constraint covering the columns `[replyId]` on the table `Replies` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Replies_parentId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Replies_replyId_key" ON "Replies"("replyId");
