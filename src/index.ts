import API from "./api.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["error", "query", "info", "warn"]
});

async function main() {
  // console.log("Getting Jurisdictions");
  // const initListings = await API.getAllJurisdictions();
  // console.log("Got Jurisdictions, ex: ", initListings[0], initListings.length);

  // console.log("Sending to DB");
  // const jurisdictionListings = await prisma.jurisdictionListing.createMany({
  //   data: initListings,
  //   skipDuplicates: true
  // })
  // console.log("Sent to DB", jurisdictionListings.count);

  const initListings = await API.getAllJurisdictions()
    try {
      await prisma.jurisdictionListing.createMany({
        data: initListings,
        skipDuplicates: true
      })
    } catch (error) {
      console.log(error)
    }

  const dbListings = await prisma.jurisdictionListing.findMany()
  const missed = initListings.filter(l => !dbListings.some(j => j.id === l.id))

  console.log("Got Results", "Missed Count: ", missed.length, missed)
  //compare dbjurs w/ oljurs
  //if dbjur not cached fetch jurstandardsets
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
