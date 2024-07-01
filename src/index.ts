import API from "./api.js";
import DB from "./db.js";
import Logger from "./logging.js";

const logger = new Logger();

async function main() {
  //compare dbjurs w/ oljurs
  const allJurs = await DB.checkJurisdictions();
  logger.beginLogs();
  const ssIDs = allJurs.map((jur) => jur.standardSetIds).flat();
  const dbSsids = await DB.prisma.standardSet.findMany({
    select: { id: true },
  });
  logger.log("ssid count = " + ssIDs.length);
  logger.log("DB ssid count = " + dbSsids.length);
  const missing = ssIDs
    .filter((id) => !dbSsids.some((record) => id == record.id))
    .slice(0, 500);
  logger.log(`Missing ${ssIDs.length - dbSsids.length} records`);
  let createdCount = 0;
  missing.forEach(async (id) => {
    logger.log("Fetching Set: " + id);
    try {
      const ss = await API.fetchStandardSet(id);
      if (!!ss) {
        const { standards, ...set } = ss;
        logger.log(`Set ${id} has ${standards.length} standards`);
        await DB.prisma.standardSet.create({
          data: {
            ...set,
            standards: {
              createMany: { data: standards, skipDuplicates: true },
            },
          },
        });
        logger.log("CREATED "+ ss.id);
        createdCount++;
      }
    } catch (error) {
      // fs.writeFileSync("logs.txt", `Issue logging ${id}\n ${error}`)
      const msg = `Issue logging ${id}\n Error message: ${error}`;
      logger.log(msg);
      console.error("Issue logging ", id);
      console.error(error);
    }
  });
  console.log("Done", "Created " + createdCount + "new records");
  //for each standardset, fetch standards
  //for each standard write standard to db
  //write standard as cached
  //after mark standardset as cached
  //after all standardset is fetched/cached mark jur as cached`
}

main();
