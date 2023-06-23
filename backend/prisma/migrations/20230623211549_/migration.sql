/*
  Warnings:

  - You are about to drop the column `photos` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "photos",
ADD COLUMN     "photo" TEXT,
ALTER COLUMN "totalLikes" SET DEFAULT 0;
