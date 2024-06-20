import API from "./api.js";
import DB from "./db.js"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["error", "query", "info", "warn"]
});

async function main() {
  //compare dbjurs w/ oljurs
    const olListings = await API.getAllJurisdictions()
    const dbListings = await prisma.jurisdictionListing.findMany()
    const newListings = olListings.filter(listing => dbListings.some(record => record.id === listing.id))
    //if newListings not cached fetch jurstandardsets
    if(newListings.length){
      DB.createJurisdictionListing(newListings)
    }
  //for each standardset, fetch standards
  //for each standard write standard to db
  //write standard as cached
  //after mark standardset as cached
  //after all standardset is fetched/cached mark jur as cached`
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
