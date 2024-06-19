-- CreateEnum
CREATE TYPE "JurisdictionType" AS ENUM ('school', 'organization', 'state', 'country', 'corporation', 'nation');

-- CreateTable
CREATE TABLE "JurisdictionListing" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "JurisdictionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "JurisdictionListing_id_key" ON "JurisdictionListing"("id");
