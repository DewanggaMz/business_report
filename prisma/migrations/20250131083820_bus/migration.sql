-- DropForeignKey
ALTER TABLE "businesses" DROP CONSTRAINT "businesses_creatorId_fkey";

-- DropIndex
DROP INDEX "businesses_creatorId_key";
