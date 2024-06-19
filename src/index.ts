import API from "./api.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Getting Jurisdictions");
  const jurisdictionListings = await API.getAllJurisdictions();
  console.log("Got Jurisdictions, ex: ", jurisdictionListings[0]);

  console.log("Sending to DB");
  const jurisdiction1 = await prisma.jurisdictionListing.create({
    data: {...jurisdictionListings[0]}
  })
  console.log("Sent to DB", jurisdiction1);
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
