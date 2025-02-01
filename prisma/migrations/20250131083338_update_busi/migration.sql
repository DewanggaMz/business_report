/*
  Warnings:

  - You are about to drop the column `InitialCapital` on the `business_owners` table. All the data in the column will be lost.
  - Added the required column `initialCapital` to the `business_owners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "business_owners" DROP COLUMN "InitialCapital",
ADD COLUMN     "initialCapital" INTEGER NOT NULL;
