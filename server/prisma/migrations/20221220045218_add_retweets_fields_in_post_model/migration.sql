-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "retweetId" INTEGER;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_retweetId_fkey" FOREIGN KEY ("retweetId") REFERENCES "Posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
