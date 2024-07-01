import {
  PrismaClient,
  StandardSet,
  Jurisdiction,
  JurisdictionType,
} from "@prisma/client";
import API from "./api.js";

export const prisma = new PrismaClient({
  log: ["error", "info", "warn"],
});

//Check DB jurs v OL jurs
async function checkJurisdictions(){
  const olJurs = await API.fetchAllJurisdictions()
  const olJurIds = olJurs.map(j => j.id)
  const dbJurs = (await prisma.jurisdiction.findMany({select: {id: true}})).map(inst => inst.id)
  const jurDif = olJurIds.filter(olId => !dbJurs.some(dbId => dbId === olId))
  if(jurDif.length){
    const newOlJurs = await Promise.all(olJurIds.map(async (id) => {
      const raw = await API.fetchJurisdiction(id)
      const {standardSets, ...record} = raw
      return record
    }))
    await prisma.jurisdiction.createMany({data: newOlJurs, skipDuplicates: true})
    console.log("Update missing jurs")
  }
  return await prisma.jurisdiction.findMany()
}

//Update Jurisdictions
async function updateJurisdictions() {
  const olListings = await API.fetchAllJurisdictions();
  const dbListings = await prisma.jurisdiction.findMany();
  const newListings = olListings.filter(
    (listing) => !dbListings.some((record) => record.id === listing.id)
  );
  //if newListings not cached fetch jurstandardsets
  if (newListings.length) {
    try {
      await prisma.jurisdiction.createMany({
        data: newListings,
        skipDuplicates: true,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

async function fillStandardSets() {
  const dbJurs = await getJurisdictions();
  if (!Array.isArray(dbJurs)) {
    console.error("No jurisdictions found");
    return;
  }
  console.log("Got Jurs");
  const missingStandardSets = dbJurs
    .filter((j) => !j.standardSetIds.length)
    .map((j) => j.id);
  console.log("MISSING STANDARD SETS", missingStandardSets.length);
  const setsToUpdate = await Promise.all(
    missingStandardSets.map(async (jur) => {
      let sets = [];
      try {
        let jurisdiction = await API.fetchJurisdiction(jur);
        sets = jurisdiction.standardSets.map((set) => set.id);
      } catch (error) {
        console.error("Error fetching: ", jur);
        throw new Error(error as string);
      }
      return { jurId: jur, sSetIds: sets };
    })
  );

  console.log("Mapped over jurisdictions w/ missing standard sets");

  setsToUpdate.forEach(async (jurisdiction) => {
    try {
      await prisma.jurisdiction.updateMany({
        where: { id: jurisdiction.jurId },
        data: { standardSetIds: jurisdiction.sSetIds },
      });
    } catch (error) {
      console.error("Couldn't update: ", jurisdiction);
      console.error(error);
    }
  });
}

async function getJurisdictions(options?: {
  id?: string;
  name?: string;
  type?: string;
  standardSets?: string | string[];
}) {
  let jurisdictions;
  if (!options) {
    jurisdictions = await prisma.jurisdiction.findMany();
    return jurisdictions;
  } else {
    switch (true) {
      case !!options.id:
        jurisdictions = await prisma.jurisdiction.findMany({
          where: { id: options.id },
        });
        break;
      case !!options.name:
        jurisdictions = await prisma.jurisdiction.findMany({
          where: {
            title: {
              contains: options.name,
            },
          },
        });
        break;
      case !!options.type:
        jurisdictions = await prisma.jurisdiction.findMany({
          where: { type: options.type as JurisdictionType },
        });
        break;
      default:
        jurisdictions = false;
    }
  }
  return jurisdictions || [];
}

async function createJurisdictionListing(
  listing: Jurisdiction | Jurisdiction[]
) {
  if (Array.isArray(listing)) {
    try {
      await prisma.jurisdiction.createMany({
        data: listing,
        skipDuplicates: true,
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      await prisma.jurisdiction.create({
        data: listing,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default {
  prisma,
  checkJurisdictions,
  updateJurisdictions,
  createJurisdictionListing,
  getJurisdictions,
};
