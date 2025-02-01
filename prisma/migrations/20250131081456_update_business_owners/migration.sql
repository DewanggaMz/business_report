/*
  Warnings:

  - Added the required column `InitialCapital` to the `business_owners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `business_owners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "business_owners" ADD COLUMN     "InitialCapital" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
