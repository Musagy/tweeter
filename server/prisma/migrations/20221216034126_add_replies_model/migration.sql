-- CreateTable
CREATE TABLE "Replies" (
    "parentId" INTEGER NOT NULL,
    "replyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Replies_pkey" PRIMARY KEY ("replyId","parentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Replies_parentId_key" ON "Replies"("parentId");

-- AddForeignKey
ALTER TABLE "Replies" ADD CONSTRAINT "Replies_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Replies" ADD CONSTRAINT "Replies_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
