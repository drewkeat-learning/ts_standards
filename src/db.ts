import { PrismaClient, JurisdictionListing, JurisdictionType } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["error", "query", "info", "warn"]
});

async function createJurisdictionListing(listing: JurisdictionListing | JurisdictionListing[]) {
  if (Array.isArray(listing)) {
    try {
      await prisma.jurisdictionListing.createMany({
        data: listing,
        skipDuplicates: true,
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      await prisma.jurisdictionListing.create({
        data: listing,
      });
    } catch (error) {
      console.error(error);
    }
  }
}






export default {
  createJurisdictionListing
}