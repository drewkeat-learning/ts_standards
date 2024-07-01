/*
  Warnings:

  - Added the required column `updatedAt` to the `Jurisdiction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Jurisdiction" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "standardSetIds" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Jurisdiction_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "JurisdictionListing" ADD CONSTRAINT "JurisdictionListing_pkey" PRIMARY KEY ("id");
